import {
    BaseAPI,
    Configuration,
    EmailClientApi,
    UsersApi,
    ApplicationSupportApi,
} from "@use-miller/shared-api-client";
import {
    AuthenticationTokenManager,
    TestUserAccounts,
} from "./AuthenticationTokenManager";
import fetch from "node-fetch";

export class ApiClientFactory {
    static contentType = "content-type";
    static jsonType = "application/json";

    public static getAllAuthenticated(): {
        applicationSupportApi: ApplicationSupportApi;
        userApi: UsersApi;
        emailClientApi: EmailClientApi;
    } {
        return {
            applicationSupportApi: ApiClientFactory.getAuthenticatedApiInstance(
                ApplicationSupportApi
            ),
            userApi: ApiClientFactory.getAuthenticatedApiInstance(UsersApi),
            emailClientApi:
                ApiClientFactory.getAuthenticatedApiInstance<EmailClientApi>(
                    EmailClientApi
                ),
        };
    }
    public static getAuthenticatedApiInstance<T extends BaseAPI>(
        apiService: {
            new (apiConfig: Configuration): T;
        },
        userType: TestUserAccounts = TestUserAccounts.BASIC_USER
    ) {
        const apiConfig = new Configuration({
            basePath: process.env.TEST_API_URL,
            accessToken: AuthenticationTokenManager.getAccessToken(userType),
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
