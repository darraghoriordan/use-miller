import { BaseAPI, Configuration } from "@use-miller/shared-api-client";

export const getAnonymousApiInstance = <T extends BaseAPI>(apiService: {
    new (apiConfig: Configuration): T;
}): T => {
    const apiConfig = new Configuration({
        basePath: process.env.NEXT_PUBLIC_API_BASE_PATH,
    });
    return new apiService(apiConfig);
};
