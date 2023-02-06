/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ApplicationSupportApi } from "@use-miller/shared-api-client";
import { ApiClientFactory } from "./commonDataModels/ApiClientFactory";

describe("When using a valid token", () => {
    const applicationSupportApi =
        ApiClientFactory.getUnAuthenticatedApiInstance(ApplicationSupportApi);

    it("unsecure endpoints are reachable", async () => {
        const response = await applicationSupportApi.appControllerGetHello();
        expect(response).toEqual("Healthy and running");
    });

    it("the auth guard secures endpoints as expected", async () => {
        await expect(() =>
            applicationSupportApi.appControllerGetHelloAuthorized()
        ).rejects.toMatchObject({ status: 401 });
    });
});
