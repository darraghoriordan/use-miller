import { ApiClientFactory } from "./commonDataModels/ApiClientFactory";

describe("When using the email client", () => {
    const { emailClientApi } = ApiClientFactory.getAllAuthenticated();

    it("I can verify the email settings", async () => {
        const noResult = await emailClientApi.emailClientControllerVerify();

        expect(noResult).toBe(undefined);
    });
});
