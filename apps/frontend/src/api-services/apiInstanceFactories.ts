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
    cookie,
    fetchApi,
}: {
    apiBase: string;
    authToken?: string;
    cookie?: string;
    fetchApi?: typeof fetch;
}) => {
    const apiClient = getAnonymousApiInstance({ apiBase, fetchApi });

    const authMiddleware: Middleware = {
        async onRequest({ request }) {
            if (authToken) {
                request.headers.set("Authorization", `Bearer ${authToken}`);
            }
            if (cookie) {
                request.headers.set("Cookie", cookie);
            }
            return request;
        },
    };

    apiClient.use(authMiddleware);
    return apiClient;
};
