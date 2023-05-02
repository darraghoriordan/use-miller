import { BaseAPI, Configuration } from "@use-miller/shared-api-client";
import { context, propagation } from "@opentelemetry/api";

export const getAuthenticatedApiInstance = async <T extends BaseAPI>(
    apiService: {
        new (apiConfig: Configuration): T;
    },
    apiBase: string,
    authToken: string,
    fetchApi?: any
) => {
    const headers = {};
    propagation.inject(context.active(), headers);
    const apiConfig = new Configuration({
        basePath: apiBase,
        accessToken: authToken,
        headers,
        fetchApi,
    });
    return new apiService(apiConfig);
};

export const getAnonymousApiInstance = <T extends BaseAPI>(
    apiService: {
        new (apiConfig: Configuration): T;
    },
    apiBase: string,
    fetchApi?: any
): T => {
    const headers = {};
    propagation.inject(context.active(), headers);
    const apiConfig = new Configuration({
        basePath: apiBase,
        headers,
        fetchApi,
    });
    return new apiService(apiConfig);
};
