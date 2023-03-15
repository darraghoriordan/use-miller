import {
    ApplicationSupportApi,
    EmailClientApi,
} from "@use-miller/shared-api-client";
import { ApiClientFactory } from "./commonDataModels/ApiClientFactory";
import { TestUserAccounts } from "./commonDataModels/AuthenticationTokenManager";

describe("When using the email client", () => {
    const emailClientApi =
        ApiClientFactory.getAuthenticatedApiInstance(EmailClientApi);

    it("I can verify the email settings", async () => {
        const result = await emailClientApi.emailClientControllerVerify();

        expect(result.result).toBe(true);
    }, 20_000);

    afterAll(async () => {
        const applicationSupportApi =
            ApiClientFactory.getAuthenticatedApiInstance(
                ApplicationSupportApi,
                TestUserAccounts.SUPER_USER
            );
        await applicationSupportApi.superPowersControllerResetDatabase();
    });
});
