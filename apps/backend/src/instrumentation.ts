/* eslint-disable @typescript-eslint/naming-convention */
import sdkNode from "@opentelemetry/sdk-node";
const { NodeSDK } = sdkNode;

import otelResource from "@opentelemetry/resources";
const { resourceFromAttributes } = otelResource;

import otelSemConv from "@opentelemetry/semantic-conventions";
const { ATTR_SERVICE_NAME } = otelSemConv;

import otelAiNode from "@opentelemetry/auto-instrumentations-node";
const { getNodeAutoInstrumentations } = otelAiNode;

import otelSdkMetrics from "@opentelemetry/sdk-metrics";
const { PeriodicExportingMetricReader } = otelSdkMetrics;

import otelExpGrpc from "@opentelemetry/exporter-metrics-otlp-grpc";
const { OTLPMetricExporter } = otelExpGrpc;

import otelSdkTrace from "@opentelemetry/sdk-trace-node";
const { ParentBasedSampler, TraceIdRatioBasedSampler } = otelSdkTrace;

import otelExpTraceHttp from "@opentelemetry/exporter-trace-otlp-http";
const { OTLPTraceExporter } = otelExpTraceHttp;

export const initTelemetry = async (): Promise<void> => {
    const metricExporter = new OTLPMetricExporter({});

    const metricReader = new PeriodicExportingMetricReader({
        exporter: metricExporter,
        exportIntervalMillis: 60_000,
    });

    const traceExporter = new OTLPTraceExporter({});

    // Sample 10% of traces in production, 100% in development
    const sampleRatio = process.env.NODE_ENV === "production" ? 0.1 : 1.0;
    const sampler = new ParentBasedSampler({
        root: new TraceIdRatioBasedSampler(sampleRatio),
    });

    const sdk = new NodeSDK({
        resource: resourceFromAttributes({
            [ATTR_SERVICE_NAME]: "backend-app",
        }),
        traceExporter,
        sampler,
        metricReaders: [metricReader],
        instrumentations: getNodeAutoInstrumentations({
            "@opentelemetry/instrumentation-fs": {
                enabled: false, // very noisy
            },
            "@opentelemetry/instrumentation-dns": {
                enabled: false, // reduces noise
            },
            "@opentelemetry/instrumentation-net": {
                enabled: false, // reduces noise
            },
        }),
    });
    console.log("starting otel instrumentation...");
    function shutdown() {
        sdk.shutdown()
            .then(
                () => {
                    console.log("SDK shut down successfully");
                },
                // eslint-disable-next-line unicorn/prevent-abbreviations
                (err: unknown) => {
                    console.log("Error shutting down SDK", err);
                },
            )

            .finally(() => process.exit(0));
    }

    process.on("exit", shutdown);
    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);

    sdk.start();

    await import("./init-app.js");

    console.log("SDK started successfully");
};
