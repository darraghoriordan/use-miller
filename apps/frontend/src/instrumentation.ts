export async function register() {
    console.log("registering instrumentation...");
    if (process.env.NEXT_RUNTIME === "nodejs") {
        await import("./otel/instrumentation.node");
    }
}
