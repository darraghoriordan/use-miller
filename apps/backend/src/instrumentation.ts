import { NodeSDK } from "@opentelemetry/sdk-node";
import { diag, DiagConsoleLogger, DiagLogLevel } from "@opentelemetry/api";
import { Resource } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
// Set an internal logger for open telemetry to report any issues to your console/stdout
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.WARN);

export const initTelemetry = (): void => {
    const sdk = new NodeSDK({
        resource: new Resource({
            [SemanticResourceAttributes.SERVICE_NAME]: "backend-app",
        }),
        instrumentations: getNodeAutoInstrumentations(),
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
    sdk.start();

    console.log("SDK started successfully");
};
