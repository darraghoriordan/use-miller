// This takes a stronger approach to disabling the SDK than the
// built in functionality. We don't even load the otel libraries
// if not required
import { initTelemetry } from "./instrumentation.js";
await (process.env.OTEL_SDK_DISABLED === "true"
    ? import("./init-app.js")
    : initTelemetry());
