/* eslint-disable @typescript-eslint/naming-convention */
import sdkNode from "@opentelemetry/sdk-node";
const { NodeSDK } = sdkNode;

import otelResource from "@opentelemetry/resources";
const { Resource } = otelResource;

import otelSemConv from "@opentelemetry/semantic-conventions";
// eslint-disable-next-line @typescript-eslint/no-deprecated
const { SemanticResourceAttributes } = otelSemConv;

import otelAiNode from "@opentelemetry/auto-instrumentations-node";
const { getNodeAutoInstrumentations } = otelAiNode;

import otelSdkMetrics from "@opentelemetry/sdk-metrics";
const { PeriodicExportingMetricReader } = otelSdkMetrics;

import otelExpGrpc from "@opentelemetry/exporter-metrics-otlp-grpc";
const { OTLPMetricExporter } = otelExpGrpc;

export const initTelemetry = async (): Promise<void> => {
    const metricExporter = new OTLPMetricExporter({});

    const metricReader = new PeriodicExportingMetricReader({
        exporter: metricExporter,
        exportIntervalMillis: 60_000,
    });

    const sdk = new NodeSDK({
        resource: new Resource({
            [SemanticResourceAttributes.SERVICE_NAME]: "backend-app",
        }),
        metricReader,
        instrumentations: getNodeAutoInstrumentations({
            "@opentelemetry/instrumentation-fs": {
                enabled: false, // very noisy
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
