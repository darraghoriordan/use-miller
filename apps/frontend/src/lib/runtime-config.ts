export interface PublicRuntimeConfig {
    apiBasePath: string;
    isGoogleAuthEnabled: boolean;
}

declare global {
    interface Window {
        __MILLER_RUNTIME_CONFIG__?: PublicRuntimeConfig;
    }
}

const buildTimeFallback: PublicRuntimeConfig = {
    apiBasePath: process.env.NEXT_PUBLIC_API_BASE_PATH ?? "",
    isGoogleAuthEnabled: process.env.NEXT_PUBLIC_GOOGLE_AUTH_ENABLED === "true",
};

export function getPublicRuntimeConfig(): PublicRuntimeConfig {
    if (typeof window === "undefined") {
        return buildTimeFallback;
    }
    return window.__MILLER_RUNTIME_CONFIG__ ?? buildTimeFallback;
}

export function requirePublicApiBasePath(): string {
    const { apiBasePath } = getPublicRuntimeConfig();
    if (!apiBasePath) {
        throw new Error("The public API base path is not configured.");
    }
    return apiBasePath;
}
