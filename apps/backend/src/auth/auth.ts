import "dotenv/config";
import { betterAuth, type Auth } from "better-auth";
import { admin, bearer } from "better-auth/plugins";
import { Pool } from "pg";
import { createAuthDatabaseUrl } from "./auth-database-url.js";
import {
    BETTER_AUTH_ADMIN_ROLE,
    configuredAdminEmails,
    isConfiguredAdminEmail,
} from "./admin-config.js";

function requiredEnvironment(key: string): string {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
    return value;
}

const googleClientId = requiredEnvironment("GOOGLE_CLIENT_ID");
const googleClientSecret = requiredEnvironment("GOOGLE_CLIENT_SECRET");
const cookieDomain = process.env.BETTER_AUTH_COOKIE_DOMAIN;
const frontendUrl = requiredEnvironment("FRONTEND_APP_URL");
const database = new Pool({ connectionString: createAuthDatabaseUrl() });

export const auth: Auth = betterAuth({
    appName: process.env.APP_TITLE ?? "Miller App",
    baseURL:
        process.env.BETTER_AUTH_URL ?? requiredEnvironment("BACKEND_APP_URL"),
    basePath: "/api/auth",
    secret: requiredEnvironment("BETTER_AUTH_SECRET"),
    trustedOrigins: [frontendUrl],
    database,
    user: {
        modelName: "ba_user",
        changeEmail: { enabled: true },
    },
    session: {
        modelName: "ba_session",
        expiresIn: 60 * 60 * 24 * 30,
        updateAge: 60 * 60 * 24,
    },
    account: {
        modelName: "ba_account",
        encryptOAuthTokens: true,
        accountLinking: {
            enabled: true,
            trustedProviders: ["google"],
            allowDifferentEmails: false,
        },
    },
    verification: { modelName: "ba_verification" },
    emailAndPassword: { enabled: false },
    databaseHooks: {
        user: {
            create: {
                before: (user) =>
                    Promise.resolve(
                        isConfiguredAdminEmail(user.email)
                            ? {
                                  data: {
                                      ...user,
                                      role: BETTER_AUTH_ADMIN_ROLE,
                                  },
                              }
                            : undefined,
                    ),
            },
        },
    },
    socialProviders: {
        google: {
            clientId: googleClientId,
            clientSecret: googleClientSecret,
            prompt: "select_account",
        },
    },
    advanced: {
        cookiePrefix: "miller",
        useSecureCookies: process.env.NODE_ENV === "production",
        database: { generateId: "uuid" },
        ...(cookieDomain
            ? {
                  crossSubDomainCookies: {
                      enabled: true,
                      domain: cookieDomain,
                  },
              }
            : {}),
    },
    plugins: [admin(), bearer({ requireSignature: true })],
}) as unknown as Auth;

export async function synchronizeConfiguredAdminUsers(): Promise<number> {
    const emails = configuredAdminEmails();
    if (emails.length === 0) {
        return 0;
    }
    const result = await database.query(
        `UPDATE "ba_user"
         SET "role" = $1, "updatedAt" = now()
         WHERE lower("email") = ANY($2::text[])
           AND "role" IS DISTINCT FROM $1`,
        [BETTER_AUTH_ADMIN_ROLE, emails],
    );
    return result.rowCount ?? 0;
}
