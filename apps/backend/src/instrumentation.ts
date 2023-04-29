import { NodeSDK } from "@opentelemetry/sdk-node";
import { diag, DiagConsoleLogger, DiagLogLevel } from "@opentelemetry/api";
import { Resource } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
// Set an internal logger for open telemetry to report any issues to your console/stdout
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.WARN);

export const initTelemetry = async (): Promise<void> => {
    const sdk = new NodeSDK({
        resource: new Resource({
            [SemanticResourceAttributes.SERVICE_NAME]: "backend-app",
        }),
        instrumentations: getNodeAutoInstrumentations(),
    });
    console.log("starting otel instrumentation...");
    process.on("SIGTERM", () => {
        // eslint-disable-next-line promise/catch-or-return
        sdk.shutdown()
            .then(
                () => console.log("SDK shut down successfully"),
                (error) => console.log("Error shutting down SDK", error)
            )
            .finally(() => process.exit(0));
    });
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await sdk.start();
    console.log("SDK started successfully");
};
