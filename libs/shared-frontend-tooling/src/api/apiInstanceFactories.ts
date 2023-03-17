import { BaseAPI, Configuration } from "@use-miller/shared-api-client";

export const getAuthenticatedApiInstance = async <T extends BaseAPI>(
    apiService: {
        new (apiConfig: Configuration): T;
    },
    apiBase: string,
    authToken: string,
    fetchApi?: any
) => {
    const apiConfig = new Configuration({
        basePath: apiBase,
        accessToken: authToken,
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
    const apiConfig = new Configuration({
        basePath: apiBase,
        fetchApi,
    });
    return new apiService(apiConfig);
};
