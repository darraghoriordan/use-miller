import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";
import { requirePublicApiBasePath } from "./runtime-config";

export const authClient = createAuthClient({
    baseURL:
        typeof window === "undefined" ? undefined : requirePublicApiBasePath(),
    fetchOptions: { credentials: "include" },
    plugins: [adminClient()],
});

export type AuthSession = typeof authClient.$Infer.Session;
