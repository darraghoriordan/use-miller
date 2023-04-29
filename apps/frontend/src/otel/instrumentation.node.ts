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

function shutdown() {
    sdk.shutdown()
        .then(
            () => console.log("SDK shut down successfully"),
            (err) => console.log("Error shutting down SDK", err)
        )
        .finally(() => process.exit(0));
}

process.on("exit", shutdown);
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
sdk.start();
console.log("SDK started successfully");
