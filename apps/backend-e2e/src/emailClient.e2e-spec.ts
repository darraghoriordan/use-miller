import { ApiClientFactory } from "./commonDataModels/ApiClientFactory";

describe("When using the email client", () => {
    const { emailClientApi } = ApiClientFactory.getAll();

    it("I can verify the email settings", async () => {
        return expect(() =>
            emailClientApi.emailClientControllerVerify()
        ).resolves.toThrow();
    });
});
