export interface PublicRuntimeConfig {
    apiBasePath: string;
}

declare global {
    interface Window {
        __MILLER_RUNTIME_CONFIG__?: PublicRuntimeConfig;
    }
}

const buildTimeFallback: PublicRuntimeConfig = {
    apiBasePath: process.env.NEXT_PUBLIC_API_BASE_PATH ?? "",
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
