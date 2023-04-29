// instrumentation.node.ts
import { NodeSDK } from "@opentelemetry/sdk-node";
import { Resource } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";

const sdk = new NodeSDK({
    resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: "next-app",
    }),
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

sdk.start();
console.log("SDK started successfully");
