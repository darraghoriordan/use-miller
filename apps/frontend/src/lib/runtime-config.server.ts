import type { PublicRuntimeConfig } from "./runtime-config";

function runtimeEnvironmentValue(name: string): string | undefined {
    return process.env[name];
}

export function readServerPublicRuntimeConfig(): PublicRuntimeConfig {
    return {
        apiBasePath: runtimeEnvironmentValue("NEXT_PUBLIC_API_BASE_PATH") ?? "",
        isGoogleAuthEnabled:
            runtimeEnvironmentValue("NEXT_PUBLIC_GOOGLE_AUTH_ENABLED") ===
            "true",
    };
}
