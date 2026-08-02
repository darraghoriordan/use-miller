import "dotenv/config";
import { betterAuth, type Auth } from "better-auth";
import { admin, bearer } from "better-auth/plugins";
import { Pool } from "pg";
import { sendAuthenticationEmail } from "./auth-email.js";
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

function createDatabaseUrl(): string {
    if (process.env.BETTER_AUTH_DATABASE_URL) {
        return process.env.BETTER_AUTH_DATABASE_URL;
    }

    const user = encodeURIComponent(requiredEnvironment("APP_POSTGRES_USER"));
    const password = encodeURIComponent(
        requiredEnvironment("APP_POSTGRES_PASSWORD"),
    );
    const host = requiredEnvironment("APP_POSTGRES_HOST");
    const port = requiredEnvironment("APP_POSTGRES_PORT");
    const database = encodeURIComponent(
        requiredEnvironment("APP_POSTGRES_DATABASE"),
    );
    return `postgres://${user}:${password}@${host}:${port}/${database}`;
}

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const cookieDomain = process.env.BETTER_AUTH_COOKIE_DOMAIN;
const frontendUrl = requiredEnvironment("FRONTEND_APP_URL");
const isEmailVerificationRequired =
    process.env.BETTER_AUTH_REQUIRE_EMAIL_VERIFICATION === "true";
const database = new Pool({ connectionString: createDatabaseUrl() });

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
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: isEmailVerificationRequired,
        minPasswordLength: 10,
        maxPasswordLength: 128,
        revokeSessionsOnPasswordReset: true,
        sendResetPassword: async ({ user, url }) => {
            await sendAuthenticationEmail({
                to: user.email,
                subject: "Reset your Miller password",
                text: `Reset your password using this one-time link: ${url}`,
            });
        },
    },
    emailVerification: {
        sendOnSignUp: isEmailVerificationRequired,
        sendOnSignIn: isEmailVerificationRequired,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, url }) => {
            await sendAuthenticationEmail({
                to: user.email,
                subject: "Verify your Miller email address",
                text: `Verify your email address using this link: ${url}`,
            });
        },
    },
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
    socialProviders:
        googleClientId && googleClientSecret
            ? {
                  google: {
                      clientId: googleClientId,
                      clientSecret: googleClientSecret,
                      prompt: "select_account",
                  },
              }
            : {},
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
