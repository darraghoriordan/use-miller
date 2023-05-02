import { NodeSDK } from "@opentelemetry/sdk-node";
import { diag, DiagConsoleLogger, DiagLogLevel } from "@opentelemetry/api";
import { Resource } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics";
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-grpc";

// Set an internal logger for open telemetry to report any issues to your console/stdout
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.WARN);

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
            // eslint-disable-next-line @typescript-eslint/naming-convention
            "@opentelemetry/instrumentation-fs": {
                enabled: false, // very noisy
            },
        }),
    });
    console.log("starting otel instrumentation...");
    function shutdown() {
        // eslint-disable-next-line promise/catch-or-return
        sdk.shutdown()
            .then(
                () => console.log("SDK shut down successfully"),
                // eslint-disable-next-line unicorn/catch-error-name, unicorn/prevent-abbreviations
                (err) => console.log("Error shutting down SDK", err)
            )
            // eslint-disable-next-line unicorn/no-process-exit
            .finally(() => process.exit(0));
    }

    process.on("exit", shutdown);
    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
    // eslint-disable-next-line promise/catch-or-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, promise/always-return
    sdk.start();

    await import("./init-app.js");

    console.log("SDK started successfully");
};
