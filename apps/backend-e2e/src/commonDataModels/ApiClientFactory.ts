import createClient, { type Middleware } from "openapi-fetch";
import type { paths } from "../shared/types/api-specs";
import {
    AuthenticationTokenManager,
    TestUserAccounts,
} from "./AuthenticationTokenManager";
import fetch from "node-fetch";

export const getAuthenticatedApiInstance = (
    userType: TestUserAccounts = TestUserAccounts.BASIC_USER,
) => {
    const apiClient = createClient<paths>({
        baseUrl: process.env.TEST_API_URL,
        // node-fetch is needed for Node.js environments
        fetch: fetch as unknown as typeof globalThis.fetch,
    });

    const authMiddleware: Middleware = {
        onRequest({ request }) {
            request.headers.set(
                "Authorization",
                `Bearer ${AuthenticationTokenManager.getAccessToken(userType)}`,
            );
            return request;
        },
    };

    apiClient.use(authMiddleware);
    return apiClient;
};

export const getUnAuthenticatedApiInstance = () => {
    return createClient<paths>({
        baseUrl: process.env.TEST_API_URL,
        fetch: fetch as unknown as typeof globalThis.fetch,
    });
};

export type ApiClient = ReturnType<typeof getAuthenticatedApiInstance>;

/**
 * Helper to throw API errors as Error objects (for ESLint @typescript-eslint/only-throw-error)
 */
export function throwIfError(
    error: unknown,
): asserts error is undefined | null {
    if (error) {
        throw new Error(JSON.stringify(error));
    }
}
