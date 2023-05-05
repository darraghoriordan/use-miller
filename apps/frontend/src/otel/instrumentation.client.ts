import { WebTracerProvider } from "@opentelemetry/sdk-trace-web";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { W3CTraceContextPropagator } from "@opentelemetry/core";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import { Resource } from "@opentelemetry/resources";
import { FetchInstrumentation } from "@opentelemetry/instrumentation-fetch";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { DocumentLoadInstrumentation } from "@opentelemetry/instrumentation-document-load";

function mapHeadersToObject(headers: string): { [key: string]: string } {
    const result: { [key: string]: string } = {};
    headers.split(",").forEach((h) => {
        const [key, value] = h.split("=");
        result[key] = value;
    });
    return result;
}
const headers = process.env.NEXT_PUBLIC_OTEL_EXPORTER_OTLP_HEADERS
    ? mapHeadersToObject(process.env.NEXT_PUBLIC_OTEL_EXPORTER_OTLP_HEADERS)
    : undefined;
export const initInstrumentation = () => {
    //no metrics for now

    const resource = new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: "next-app-client",
    });

    const provider = new WebTracerProvider({ resource });

    const exporter = new OTLPTraceExporter({
        // optional - url default value is http://localhost:4318/v1/traces
        url: `${process.env.NEXT_PUBLIC_OTEL_EXPORTER_OTLP_ENDPOINT}`,
        headers: headers,
    });
    provider.addSpanProcessor(new BatchSpanProcessor(exporter));

    // Initialize the provider
    provider.register({
        propagator: new W3CTraceContextPropagator(),
    });

    // Registering instrumentations / plugins
    registerInstrumentations({
        instrumentations: [
            new DocumentLoadInstrumentation(),
            new FetchInstrumentation({
                propagateTraceHeaderCorsUrls: [
                    /localhost/g,
                    /honeycomb.io/g,
                    /host.docker.internal/g,
                ],
                clearTimingResources: true,
            }),
        ],
    });
};
