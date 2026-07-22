import { NodeSDK } from "@opentelemetry/sdk-node";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { ATTR_SERVICE_NAME } from "@opentelemetry/semantic-conventions";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import {
    ParentBasedSampler,
    TraceIdRatioBasedSampler,
} from "@opentelemetry/sdk-trace-node";

const traceExporter = new OTLPTraceExporter({});

// Sample 10% of traces in production, 100% in development
const sampleRatio = process.env.NODE_ENV === "production" ? 0.1 : 1.0;
const sampler = new ParentBasedSampler({
    root: new TraceIdRatioBasedSampler(sampleRatio),
});

const sdk = new NodeSDK({
    resource: resourceFromAttributes({
        [ATTR_SERVICE_NAME]: "next-app",
    }),
    traceExporter,
    sampler,
});
console.log("starting otel instrumentation...");

function shutdown() {
    sdk.shutdown()
        .then(
            () => console.log("SDK shut down successfully"),
            (err) => console.log("Error shutting down SDK", err),
        )
        .finally(() => process.exit(0));
}

process.on("exit", shutdown);
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
sdk.start();
console.log("SDK started successfully");
