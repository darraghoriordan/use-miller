import { initTelemetry } from "./instrumentation.js";
await (process.env.OTEL_SDK_DISABLED === "true"
    ? import("./init-app.js")
    : initTelemetry());
