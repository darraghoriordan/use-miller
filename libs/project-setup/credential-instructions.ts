import path from "node:path";
import { readEnvironmentFile } from "./environment-files.js";
import type {
    CredentialInstruction,
    MillerConfig,
    SetupCapability,
    SetupProfile,
} from "./miller-types.js";

const stripeKeysUrl = "https://dashboard.stripe.com/apikeys";
const stripeWebhooksUrl = "https://dashboard.stripe.com/webhooks";
const googleClientsUrl = "https://console.cloud.google.com/auth/clients";

function isPresent(values: Map<string, string>, keys: string[]): boolean {
    return keys.every((key) => Boolean(values.get(key)?.trim()));
}

function profileDestination(
    config: MillerConfig,
    profile: SetupProfile,
    capability: SetupCapability,
): string {
    if (capability === "billing") {
        return `${
            config.infrastructure?.profiles[profile].billing ??
            (profile === "local"
                ? "infrastructure/local-dev/stripe-dev"
                : "infrastructure/production/stripe-prod")
        }/terraform.tfvars`;
    }
    if (profile === "local") {
        return `${config.applications.backend}/.env`;
    }
    return `${config.infrastructure?.profiles.production.environment ?? "infrastructure/production/dokku-app"}/terraform.tfvars`;
}

export async function credentialInstructions(options: {
    root: string;
    config: MillerConfig;
    profile: SetupProfile;
    capabilities?: SetupCapability[];
}): Promise<CredentialInstruction[]> {
    const capabilities = options.capabilities ?? ["auth", "billing"];
    const destinationByCapability = new Map<
        SetupCapability,
        { relative: string; values: Map<string, string> }
    >();
    for (const capability of capabilities) {
        const relative = profileDestination(
            options.config,
            options.profile,
            capability,
        );
        destinationByCapability.set(capability, {
            relative,
            values: await readEnvironmentFile(
                path.join(options.root, relative),
            ),
        });
    }

    const values: CredentialInstruction[] = [];
    if (capabilities.includes("auth")) {
        const target = destinationByCapability.get("auth");
        if (target) {
            const prefix = options.profile === "production" ? "app_" : "";
            const authSecretKey = `${prefix}${options.profile === "production" ? "better_auth_secret" : "BETTER_AUTH_SECRET"}`;
            const authUrlKey = `${prefix}${options.profile === "production" ? "better_auth_url" : "BETTER_AUTH_URL"}`;
            const googleClientKey = `${prefix}${options.profile === "production" ? "google_client_id" : "GOOGLE_CLIENT_ID"}`;
            const googleSecretKey = `${prefix}${options.profile === "production" ? "google_client_secret" : "GOOGLE_CLIENT_SECRET"}`;
            const adminEmailsKey = `${prefix}${options.profile === "production" ? "super_user_emails" : "SUPER_USER_EMAILS"}`;
            values.push({
                id: "better-auth",
                capability: "auth",
                required: true,
                configured: isPresent(target.values, [
                    authSecretKey,
                    authUrlKey,
                ]),
                environmentVariables:
                    options.profile === "production"
                        ? [
                              "MILLER_FRONTEND_BASE_URL",
                              "MILLER_BACKEND_BASE_URL",
                          ]
                        : [],
                destination: target.relative,
                destinationKeys: [authSecretKey, authUrlKey],
                instructions:
                    options.profile === "production"
                        ? "Miller generates and preserves the signing secret. Supply the public frontend and backend HTTPS URLs."
                        : "Miller generates and preserves the local signing secret; no external account is required.",
            });
            values.push({
                id: "google-oauth",
                capability: "auth",
                required: false,
                configured: isPresent(target.values, [
                    googleClientKey,
                    googleSecretKey,
                ]),
                environmentVariables: [
                    "MILLER_GOOGLE_CLIENT_ID",
                    "MILLER_GOOGLE_CLIENT_SECRET",
                ],
                destination: target.relative,
                destinationKeys: [googleClientKey, googleSecretKey],
                sourceUrl: googleClientsUrl,
                instructions:
                    "Optional: create a Google OAuth Web application and copy its client ID and client secret.",
                relatedUrl: `${
                    process.env.MILLER_BACKEND_BASE_URL ??
                    target.values.get(
                        options.profile === "local"
                            ? "BETTER_AUTH_URL"
                            : "app_better_auth_url",
                    ) ??
                    target.values.get("app_backend_app_url") ??
                    (options.profile === "local"
                        ? "http://localhost:34522"
                        : "https://api.example.com")
                }/api/auth/callback/google`,
            });
            values.push({
                id: "owner-admin",
                capability: "auth",
                required: false,
                configured: isPresent(target.values, [adminEmailsKey]),
                environmentVariables: ["MILLER_SUPER_USER_EMAILS"],
                destination: target.relative,
                destinationKeys: [adminEmailsKey],
                instructions:
                    "Recommended: add the comma-separated owner emails that should receive Better Auth admin access and Miller's global application permissions.",
            });
        }
    }
    if (capabilities.includes("billing")) {
        const target = destinationByCapability.get("billing");
        if (target) {
            const tokenKey = "app_stripe_api_token";
            values.push({
                id: "stripe-api-key",
                capability: "billing",
                required: true,
                configured: isPresent(target.values, [tokenKey]),
                environmentVariables: ["MILLER_STRIPE_ACCESS_TOKEN"],
                destination: target.relative,
                destinationKeys: [tokenKey],
                sourceUrl: stripeKeysUrl,
                instructions: `Copy the Stripe ${options.profile === "production" ? "live-mode" : "test-mode"} secret key.`,
            });
            if (options.profile === "local") {
                values.push({
                    id: "stripe-webhook-secret",
                    capability: "billing",
                    required: true,
                    configured: isPresent(target.values, [
                        "app_stripe_webhook_verification_key",
                    ]),
                    environmentVariables: [
                        "MILLER_STRIPE_WEBHOOK_VERIFICATION_KEY",
                    ],
                    destination: target.relative,
                    destinationKeys: ["app_stripe_webhook_verification_key"],
                    sourceUrl: stripeWebhooksUrl,
                    instructions:
                        "Copy the test webhook endpoint signing secret (whsec_...). Production Terraform creates its webhook and captures the secret automatically.",
                    relatedUrl: `${process.env.MILLER_BACKEND_BASE_URL ?? "http://localhost:34522"}/payments/stripe/webhook-receiver`,
                });
            }
        }
    }
    return values;
}
