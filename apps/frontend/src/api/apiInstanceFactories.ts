import { BaseAPI, Configuration } from "@use-miller/shared-api-client";
const apiBase = import.meta.env.VITE_API_BASE as string;

export const getAuthenticatedApiInstance = async <T extends BaseAPI>(
    apiService: {
        new (apiConfig: Configuration): T;
    },
    getAccessTokenSilently: () => Promise<string>
) => {
    const authToken = await getAccessTokenSilently();

    const apiConfig = new Configuration({
        basePath: apiBase,
        accessToken: authToken,
    });
    return new apiService(apiConfig);
};

export const getAnonymousApiInstance = <T extends BaseAPI>(apiService: {
    new (apiConfig: Configuration): T;
}): T => {
    const apiConfig = new Configuration({
        basePath: apiBase,
    });
    return new apiService(apiConfig);
};
