import { EmailClientApi } from "@use-miller/shared-api-client";
import { ApiClientFactory } from "./commonDataModels/ApiClientFactory";

describe("When using the email client", () => {
    const emailClientApi =
        ApiClientFactory.getAuthenticatedApiInstance(EmailClientApi);

    it("I can verify the email settings", async () => {
        const noResult = await emailClientApi.emailClientControllerVerify();

        expect(noResult).toBe(undefined);
    });
});
