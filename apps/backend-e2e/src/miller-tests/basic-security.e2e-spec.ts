import {
    getAuthenticatedApiInstance,
    getUnAuthenticatedApiInstance,
    throwIfError,
    type ApiClient,
} from "../commonDataModels/ApiClientFactory";
import { TestUserAccounts } from "../commonDataModels/AuthenticationTokenManager";

describe("For unauthenticated users", () => {
    const api: ApiClient = getUnAuthenticatedApiInstance();

    it("unsecure endpoints are reachable", async () => {
        const { data, error } = await api.GET("/admin/health");
        throwIfError(error);
        expect(data).toEqual("Healthy and running");
    });

    it("secure endpoints are blocked", async () => {
        const { response } = await api.GET("/admin/health/is-authorised");
        expect(response.status).toBe(401);
    });

    it("super secure endpoints are blocked", async () => {
        const { response } = await api.GET("/admin/health/is-super-admin");
        expect(response.status).toBe(401);
    });
});

describe("For normal authorized users", () => {
    const api: ApiClient = getAuthenticatedApiInstance();

    it("unsecure endpoints are reachable", async () => {
        const { data, error } = await api.GET("/admin/health");
        throwIfError(error);
        expect(data).toEqual("Healthy and running");
    });

    it("secures endpoints are reachable", async () => {
        const { data, error } = await api.GET("/admin/health/is-authorised");
        throwIfError(error);
        expect(data).toEqual("Healthy and running");
    });

    it("super secure endpoints are blocked", async () => {
        const { response } = await api.GET("/admin/health/is-super-admin");
        expect(response.status).toBe(403);
    });
});

describe("For super admin authorized users", () => {
    const api: ApiClient = getAuthenticatedApiInstance(
        TestUserAccounts.SUPER_USER,
    );

    it("unsecure endpoints are reachable", async () => {
        const { data, error } = await api.GET("/admin/health");
        throwIfError(error);
        expect(data).toEqual("Healthy and running");
    });

    it("secures endpoints are reachable", async () => {
        const { data, error } = await api.GET("/admin/health/is-authorised");
        throwIfError(error);
        expect(data).toEqual("Healthy and running");
    });

    it("super secure endpoints are reachable", async () => {
        const { data, error } = await api.GET("/admin/health/is-super-admin");
        throwIfError(error);
        expect(data).toEqual("Healthy and running");
    });
});
