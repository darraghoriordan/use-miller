import {
    BaseAPI,
    Configuration,
    EmailClientApi,
    UsersApi,
    ApplicationSupportApi,
} from "@use-miller/shared-api-client";
import { AuthenticationTokenManager } from "./AuthenticationTokenManager";
import fetch from "node-fetch";

export class ApiClientFactory {
    static contentType = "content-type";
    static jsonType = "application/json";
    static validToken = "";

    public static getAllAuthenticated(elevateToSuperUser = false): {
        applicationSupportApi: ApplicationSupportApi;
        userApi: UsersApi;
        emailClientApi: EmailClientApi;
    } {
        return {
            applicationSupportApi: ApiClientFactory.getAuthenticatedApiInstance(
                ApplicationSupportApi,
                elevateToSuperUser
            ),
            userApi: ApiClientFactory.getAuthenticatedApiInstance(
                UsersApi,
                elevateToSuperUser
            ),
            emailClientApi:
                ApiClientFactory.getAuthenticatedApiInstance<EmailClientApi>(
                    EmailClientApi,
                    elevateToSuperUser
                ),
        };
    }
    public static getAuthenticatedApiInstance<T extends BaseAPI>(
        apiService: {
            new (apiConfig: Configuration): T;
        },
        elevateToSuperUser = false
    ) {
        const apiConfig = new Configuration({
            basePath: process.env.TEST_API_URL,
            accessToken: elevateToSuperUser
                ? AuthenticationTokenManager.validSuperUserToken
                : AuthenticationTokenManager.validBasicUserToken,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            fetchApi: fetch as any,
        });
        return new apiService(apiConfig);
    }

    public static getUnAuthenticatedApiInstance<T extends BaseAPI>(apiService: {
        new (apiConfig: Configuration): T;
    }) {
        const apiConfig = new Configuration({
            basePath: process.env.TEST_API_URL,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            fetchApi: fetch as any,
        });
        return new apiService(apiConfig);
    }
}
