import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_PATH,
    fetchOptions: { credentials: "include" },
    plugins: [adminClient()],
});

export type AuthSession = typeof authClient.$Infer.Session;
