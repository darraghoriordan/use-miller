import createClient, { type Middleware } from "openapi-fetch";
import { context, propagation } from "@opentelemetry/api";
import type { paths } from "../shared/types/api-specs";

export const getAnonymousApiInstance = ({
    apiBase,
    fetchApi,
}: {
    apiBase: string;
    fetchApi?: typeof fetch;
}) => {
    const openTelemetryMiddleware: Middleware = {
        async onRequest({ request }) {
            propagation.inject(context.active(), request.headers);
            return request;
        },
    };

    const apiClient = createClient<paths>({
        baseUrl: apiBase,
        fetch: fetchApi,
    });

    apiClient.use(openTelemetryMiddleware);
    return apiClient;
};

export const getAuthenticatedApiInstance = ({
    apiBase,
    authToken,
    fetchApi,
}: {
    apiBase: string;
    authToken: string;
    fetchApi?: typeof fetch;
}) => {
    const apiClient = getAnonymousApiInstance({ apiBase, fetchApi });

    const authMiddleware: Middleware = {
        async onRequest({ request }) {
            request.headers.set("Authorization", `Bearer ${authToken}`);
            return request;
        },
    };

    apiClient.use(authMiddleware);
    return apiClient;
};

// Type export for the API client
export type ApiClient = ReturnType<typeof getAnonymousApiInstance>;
