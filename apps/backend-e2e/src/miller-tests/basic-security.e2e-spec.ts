/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ApplicationSupportApi } from "@use-miller/shared-api-client";
import { ApiClientFactory } from "./commonDataModels/ApiClientFactory";
import { TestUserAccounts } from "./commonDataModels/AuthenticationTokenManager";

describe("For unauthenticated users", () => {
    const applicationSupportApi =
        ApiClientFactory.getUnAuthenticatedApiInstance(ApplicationSupportApi);

    it("unsecure endpoints are reachable", async () => {
        const response = await applicationSupportApi.appControllerGetHello();
        expect(response).toEqual("Healthy and running");
    });

    it("secure endpoints are blocked", async () => {
        await expect(() =>
            applicationSupportApi.appControllerGetHelloAuthorized()
        ).rejects.toMatchObject({ status: 401 });
    });

    it("super secure endpoints are blocked", async () => {
        await expect(() =>
            applicationSupportApi.appControllerGetHelloSuperAdmin()
        ).rejects.toMatchObject({ status: 401 });
    });
});

describe("For normal authorized users", () => {
    const applicationSupportApi = ApiClientFactory.getAuthenticatedApiInstance(
        ApplicationSupportApi
    );

    it("unsecure endpoints are reachable", async () => {
        const response = await applicationSupportApi.appControllerGetHello();
        expect(response).toEqual("Healthy and running");
    });

    it("secures endpoints are reachable", async () => {
        const response =
            await applicationSupportApi.appControllerGetHelloAuthorized();
        expect(response).toEqual("Healthy and running");
    });

    it("super secure endpoints are blocked", async () => {
        await expect(() =>
            applicationSupportApi.appControllerGetHelloSuperAdmin()
        ).rejects.toMatchObject({ status: 403 });
    });
});

describe("For super admin authorized users", () => {
    const applicationSupportApi = ApiClientFactory.getAuthenticatedApiInstance(
        ApplicationSupportApi,
        TestUserAccounts.SUPER_USER
    );

    it("unsecure endpoints are reachable", async () => {
        const response = await applicationSupportApi.appControllerGetHello();
        expect(response).toEqual("Healthy and running");
    });

    it("secures endpoints are reachable", async () => {
        const response =
            await applicationSupportApi.appControllerGetHelloAuthorized();
        expect(response).toEqual("Healthy and running");
    });

    it("super secure endpoints are reachable", async () => {
        const response =
            await applicationSupportApi.appControllerGetHelloSuperAdmin();
        expect(response).toEqual("Healthy and running");
    });

    afterAll(async () => {
        await applicationSupportApi.superPowersControllerResetDatabase();
    });
});
