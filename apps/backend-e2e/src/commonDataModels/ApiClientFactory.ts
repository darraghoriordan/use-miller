import {
    BaseAPI,
    Configuration,
    FilterSettingsApi,
    ReceivedRolesApi,
    SharingLinksApi,
    SubmittedRolesApi,
    EmailClientApi,
    PersonsApi,
    ApplicationSupportApi,
} from "@use-miller/shared-api-client";
import { AuthenticatedRequests } from "./AuthenticatedRequests";
import fetch from "node-fetch";

export class ApiClientFactory {
    static contentType = "content-type";
    static jsonType = "application/json";
    static validToken = "";

    public static getAll(): {
        applicationSupportApi: ApplicationSupportApi;
        personApi: PersonsApi;
        submittedRolesApi: SubmittedRolesApi;
        filterSettingsApi: FilterSettingsApi;
        receivedRolesApi: ReceivedRolesApi;
        sharingLinksApi: SharingLinksApi;
        emailClientApi: EmailClientApi;
    } {
        return {
            applicationSupportApi: ApiClientFactory.getAuthenticatedApiInstance(
                ApplicationSupportApi
            ),
            personApi: ApiClientFactory.getAuthenticatedApiInstance(PersonsApi),
            submittedRolesApi:
                ApiClientFactory.getAuthenticatedApiInstance(SubmittedRolesApi),
            receivedRolesApi:
                ApiClientFactory.getAuthenticatedApiInstance(ReceivedRolesApi),
            filterSettingsApi:
                ApiClientFactory.getAuthenticatedApiInstance(FilterSettingsApi),
            sharingLinksApi:
                ApiClientFactory.getAuthenticatedApiInstance(SharingLinksApi),
            emailClientApi:
                ApiClientFactory.getAuthenticatedApiInstance<EmailClientApi>(
                    EmailClientApi
                ),
        };
    }
    public static getAuthenticatedApiInstance<T extends BaseAPI>(apiService: {
        new (apiConfig: Configuration): T;
    }) {
        const apiConfig = new Configuration({
            basePath: process.env.TEST_API_URL,
            accessToken: AuthenticatedRequests.validToken,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            fetchApi: fetch as any,
        });
        return new apiService(apiConfig);
    }
}
