import {
    getAuthenticatedApiInstance,
    throwIfError,
    type ApiClient,
} from "../commonDataModels/ApiClientFactory";

describe("When using the email client", () => {
    const api: ApiClient = getAuthenticatedApiInstance();

    it("I can verify the email settings", async () => {
        const { data: result, error } = await api.GET("/email-client/verify");
        throwIfError(error);

        expect(result.result).toBe(true);
    }, 20_000);
});
