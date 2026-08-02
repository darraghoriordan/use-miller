import { randomBytes } from "node:crypto";
import { access } from "node:fs/promises";
import path from "node:path";
import { credentialInstructions } from "./credential-instructions.js";
import {
    applyFilePlan,
    planEnvironmentFile,
    planTerraformVariablesFile,
    readEnvironmentFile,
    type FilePlan,
} from "./environment-files.js";
import type {
    MillerConfig,
    SetupCapability,
    SetupChange,
    SetupProfile,
    SetupResult,
    SetupStep,
} from "./miller-types.js";
import {
    applyTerraform,
    readTerraformOutputs,
    requiredStringOutput,
    type TerraformOutputs,
} from "./terraform-runner.js";

export interface SetupOptions {
    root: string;
    config: MillerConfig;
    profile: SetupProfile;
    capabilities: SetupCapability[];
    shouldApplyTerraform: boolean;
    shouldWriteEnvironment: boolean;
    shouldReadInputsFromEnvironment: boolean;
    canSkipUnavailableOutputs: boolean;
    isJson: boolean;
}

const fallbackInfrastructurePaths: Record<
    SetupProfile,
    Record<SetupCapability, string>
> = {
    local: { auth: "", billing: "infrastructure/local-dev/stripe-dev" },
    production: {
        auth: "",
        billing: "infrastructure/production/stripe-prod",
    },
};

const deprecatedProductionAuthKeys = [
    "app_auth0_audience",
    "app_auth0_clientId",
    "app_auth0_domain",
    "frontend_app_auth0_audience",
    "frontend_app_auth0_client_id",
    "frontend_app_auth0_client_secret",
    "frontend_app_auth0_domain",
    "frontend_app_auth0_secret",
];

async function fileExists(filePath: string): Promise<boolean> {
    try {
        await access(filePath);
        return true;
    } catch {
        return false;
    }
}

function infrastructurePath(
    root: string,
    config: MillerConfig,
    profile: SetupProfile,
    capability: SetupCapability,
): string {
    const configured = config.infrastructure?.profiles[profile]?.[capability];
    return path.join(
        root,
        configured ?? fallbackInfrastructurePaths[profile][capability],
    );
}

function requiredSetupEnvironment(
    options: SetupOptions,
    name: string,
    existing?: string,
): string {
    const value = process.env[name] ?? existing;
    if (!value) {
        if (!options.shouldApplyTerraform && !options.shouldWriteEnvironment) {
            return `<set ${name}>`;
        }
        throw new Error(
            `Missing ${name}. See the credentials section from mill report --profile ${options.profile} --json, then export it or provide an existing terraform.tfvars file.`,
        );
    }
    return value;
}

function terraformInputValues(
    options: SetupOptions,
    capability: SetupCapability,
    config: MillerConfig,
    existing: Map<string, string>,
): Record<string, string> {
    const frontendBaseUrl =
        process.env.MILLER_FRONTEND_BASE_URL ??
        (options.profile === "local" ? "http://localhost:3000" : undefined);
    const backendBaseUrl =
        process.env.MILLER_BACKEND_BASE_URL ??
        (options.profile === "local" ? "http://localhost:34522" : undefined);
    const values: Record<string, string> = {
        app_stripe_api_token: requiredSetupEnvironment(
            options,
            "MILLER_STRIPE_ACCESS_TOKEN",
            existing.get("app_stripe_api_token"),
        ),
        app_stripe_webhook_url: `${requiredSetupEnvironment(options, "MILLER_BACKEND_BASE_URL", backendBaseUrl)}/payments/stripe/webhook-receiver`,
        app_stripe_customer_portal_privacy_url: `${requiredSetupEnvironment(options, "MILLER_FRONTEND_BASE_URL", frontendBaseUrl)}/privacy`,
        app_stripe_customer_portal_header: `${config.project.name} Billing`,
        app_stripe_customer_portal_terms_conditions_url: `${requiredSetupEnvironment(options, "MILLER_FRONTEND_BASE_URL", frontendBaseUrl)}/terms`,
        app_stripe_customer_portal_return_url: `${requiredSetupEnvironment(options, "MILLER_FRONTEND_BASE_URL", frontendBaseUrl)}/dashboard`,
    };
    if (options.profile === "local") {
        values.app_stripe_webhook_verification_key = requiredSetupEnvironment(
            options,
            "MILLER_STRIPE_WEBHOOK_VERIFICATION_KEY",
            existing.get("app_stripe_webhook_verification_key"),
        );
        values.app_stripe_fulfilment_gh_token =
            process.env.MILLER_GITHUB_ACCESS_TOKEN ??
            existing.get("app_stripe_fulfilment_gh_token") ??
            "";
    }
    return values;
}

function relativeChange(root: string, change: SetupChange): SetupChange {
    return { ...change, target: path.relative(root, change.target) };
}

async function planTerraformInputs(
    options: SetupOptions,
): Promise<Map<SetupCapability, FilePlan>> {
    const plans = new Map<SetupCapability, FilePlan>();
    for (const capability of options.capabilities) {
        if (capability === "auth") {
            continue;
        }
        const projectPath = infrastructurePath(
            options.root,
            options.config,
            options.profile,
            capability,
        );
        const variablesPath = path.join(projectPath, "terraform.tfvars");
        if (!options.shouldReadInputsFromEnvironment) {
            if (!(await fileExists(variablesPath))) {
                throw new Error(
                    `${path.relative(options.root, variablesPath)} is missing. Copy its template or rerun with --from-env.`,
                );
            }
            continue;
        }
        plans.set(
            capability,
            await planTerraformVariablesFile(
                variablesPath,
                path.join(projectPath, "terraform.tfvars.template"),
                terraformInputValues(
                    options,
                    capability,
                    options.config,
                    await readEnvironmentFile(variablesPath),
                ),
            ),
        );
    }
    return plans;
}

function stripeCatalog(
    outputs: TerraformOutputs,
    profile: SetupProfile,
): Record<string, unknown> {
    const catalog = outputs.stripe_product_catalog?.value;
    if (
        typeof catalog === "object" &&
        catalog !== null &&
        !Array.isArray(catalog)
    ) {
        return catalog as Record<string, unknown>;
    }

    if (profile === "production") {
        return {
            "miller-start-consulting": {
                priceId: requiredStringOutput(
                    outputs,
                    "miller_start_consult_price_id",
                ),
                mode: "subscription",
                internalSku: "miller-start-consulting",
                displayName: "Miller Start Consulting",
            },
            "dev-shell": {
                priceId: requiredStringOutput(outputs, "dev_shell_price_id"),
                mode: "payment",
                internalSku: "dev-shell",
                displayName: "Dev Shell",
            },
        };
    }

    return {
        "miller-start": {
            priceId: requiredStringOutput(outputs, "regular_price_id"),
            mode: "subscription",
            internalSku: "miller-start",
            displayName: "Miller Start",
        },
        "miller-start-consulting": {
            priceId: requiredStringOutput(
                outputs,
                "miller_start_consult_price_id",
            ),
            mode: "subscription",
            internalSku: "miller-start-consulting",
            displayName: "Miller Start Consulting",
        },
        "dev-shell": {
            priceId: requiredStringOutput(
                outputs,
                outputs.regular_price_no_recurrence_id
                    ? "regular_price_no_recurrence_id"
                    : "dev_shell_price_id",
            ),
            mode: "payment",
            internalSku: "dev-shell",
            displayName: "Dev Shell",
        },
    };
}

async function environmentPlans(
    options: SetupOptions,
    outputs: Map<SetupCapability, TerraformOutputs>,
): Promise<FilePlan[]> {
    const backendRoot = path.join(
        options.root,
        options.config.applications.backend,
    );
    const frontendRoot = path.join(
        options.root,
        options.config.applications.frontend,
    );
    const backendValues: Record<string, string> = {
        COMPOSE_PROJECT_NAME: options.config.project.slug.replaceAll("-", "_"),
        APP_POSTGRES_DATABASE: `${options.config.project.slug.replaceAll("-", "")}db`,
        APP_TITLE: `${options.config.project.name} API`,
        EMAIL_SENDER_NAME: options.config.project.name,
    };
    const frontendValues: Record<string, string> = {};
    const endToEndValues: Record<string, string> = {};

    if (options.profile === "production") {
        const deploymentRoot = path.join(
            options.root,
            options.config.infrastructure?.profiles.production.environment ??
                "infrastructure/production/dokku-app",
        );
        const variablesPath = path.join(deploymentRoot, "terraform.tfvars");
        const existing = await readEnvironmentFile(variablesPath);
        const values: Record<string, string> = {};
        const frontendBaseUrl = process.env.MILLER_FRONTEND_BASE_URL;
        const backendBaseUrl = process.env.MILLER_BACKEND_BASE_URL;
        if (options.capabilities.includes("auth")) {
            const existingSecret = existing.get("app_better_auth_secret");
            values.app_better_auth_secret =
                existingSecret && existingSecret.length >= 32
                    ? existingSecret
                    : randomBytes(32).toString("base64url");
            values.app_better_auth_url = requiredSetupEnvironment(
                options,
                "MILLER_BACKEND_BASE_URL",
                existing.get("app_better_auth_url") ??
                    existing.get("app_backend_app_url") ??
                    backendBaseUrl,
            );
            values.app_better_auth_cookie_domain =
                process.env.MILLER_AUTH_COOKIE_DOMAIN ??
                existing.get("app_better_auth_cookie_domain") ??
                "";
            values.app_better_auth_require_email_verification =
                process.env.MILLER_REQUIRE_EMAIL_VERIFICATION ??
                existing.get("app_better_auth_require_email_verification") ??
                "true";
            values.app_google_client_id =
                process.env.MILLER_GOOGLE_CLIENT_ID ??
                existing.get("app_google_client_id") ??
                "";
            values.app_google_client_secret =
                process.env.MILLER_GOOGLE_CLIENT_SECRET ??
                existing.get("app_google_client_secret") ??
                "";
            values.app_super_user_emails =
                process.env.MILLER_SUPER_USER_EMAILS ??
                existing.get("app_super_user_emails") ??
                "";
            values.frontend_app_base_url = requiredSetupEnvironment(
                options,
                "MILLER_FRONTEND_BASE_URL",
                existing.get("frontend_app_base_url") ?? frontendBaseUrl,
            );
            values.frontend_app_api_base_path = values.app_better_auth_url;
            values.frontend_app_google_auth_enabled =
                values.app_google_client_id && values.app_google_client_secret
                    ? "true"
                    : "false";
        }
        const billingOutputs = outputs.get("billing");
        if (billingOutputs) {
            values.app_stripe_access_token = requiredStringOutput(
                billingOutputs,
                "app_stripe_api_token",
            );
            values.app_stripe_webhook_verification_key = requiredStringOutput(
                billingOutputs,
                "app_stripe_webhook_verification_key",
            );
            values.app_stripe_product_catalog_json = JSON.stringify(
                stripeCatalog(billingOutputs, options.profile),
            );
            values.app_stripe_redirects_base_url = requiredSetupEnvironment(
                options,
                "MILLER_FRONTEND_BASE_URL",
                existing.get("app_stripe_redirects_base_url") ??
                    frontendBaseUrl,
            );
        }
        return [
            await planTerraformVariablesFile(
                variablesPath,
                path.join(deploymentRoot, "terraform.tfvars.template"),
                values,
                options.capabilities.includes("auth")
                    ? deprecatedProductionAuthKeys
                    : [],
            ),
        ];
    }

    if (options.capabilities.includes("auth")) {
        const backendEnvironment = await readEnvironmentFile(
            path.join(backendRoot, ".env"),
        );
        const frontendBaseUrl =
            process.env.MILLER_FRONTEND_BASE_URL ?? "http://localhost:3000";
        const backendBaseUrl =
            process.env.MILLER_BACKEND_BASE_URL ?? "http://localhost:34522";
        const existingSecret = backendEnvironment.get("BETTER_AUTH_SECRET");
        const betterAuthSecret =
            existingSecret && existingSecret.length >= 32
                ? existingSecret
                : randomBytes(32).toString("base64url");
        const testOwnerEmail =
            process.env.MILLER_AUTH_TEST_ACCOUNT_USERNAME ??
            "owner@example.test";
        const googleClientId =
            process.env.MILLER_GOOGLE_CLIENT_ID ??
            backendEnvironment.get("GOOGLE_CLIENT_ID") ??
            "";
        const googleClientSecret =
            process.env.MILLER_GOOGLE_CLIENT_SECRET ??
            backendEnvironment.get("GOOGLE_CLIENT_SECRET") ??
            "";

        Object.assign(backendValues, {
            BETTER_AUTH_SECRET: betterAuthSecret,
            BETTER_AUTH_URL: backendBaseUrl,
            BETTER_AUTH_REQUIRE_EMAIL_VERIFICATION:
                process.env.MILLER_REQUIRE_EMAIL_VERIFICATION ?? "false",
            GOOGLE_CLIENT_ID: googleClientId,
            GOOGLE_CLIENT_SECRET: googleClientSecret,
            SUPER_USER_EMAILS:
                process.env.MILLER_SUPER_USER_EMAILS ??
                backendEnvironment.get("SUPER_USER_EMAILS") ??
                "",
        });
        Object.assign(frontendValues, {
            APP_BASE_URL: frontendBaseUrl,
            NEXT_PUBLIC_API_BASE_PATH: backendBaseUrl,
            NEXT_PUBLIC_GOOGLE_AUTH_ENABLED:
                googleClientId && googleClientSecret ? "true" : "false",
        });
        Object.assign(endToEndValues, {
            BETTER_AUTH_TEST_ACCOUNT_USERNAME: testOwnerEmail,
            BETTER_AUTH_TEST_ACCOUNT_PASSWORD:
                process.env.MILLER_AUTH_TEST_ACCOUNT_PASSWORD ??
                "Miller-test-password-1!",
            BETTER_AUTH_TEST_ACCOUNT_BASIC_USERNAME:
                process.env.MILLER_AUTH_TEST_ACCOUNT_BASIC_USERNAME ??
                "member@example.test",
            BETTER_AUTH_TEST_ACCOUNT_BASIC_PASSWORD:
                process.env.MILLER_AUTH_TEST_ACCOUNT_BASIC_PASSWORD ??
                "Miller-test-password-2!",
            BETTER_AUTH_TEST_ACCOUNT_NO_EMAILV_USERNAME:
                process.env.MILLER_AUTH_TEST_ACCOUNT_NO_EMAILV_USERNAME ??
                "unverified@example.test",
            BETTER_AUTH_TEST_ACCOUNT_NO_EMAILV_PASSWORD:
                process.env.MILLER_AUTH_TEST_ACCOUNT_NO_EMAILV_PASSWORD ??
                "Miller-test-password-3!",
        });
    }

    const billingOutputs = outputs.get("billing");
    if (billingOutputs) {
        backendValues.STRIPE_ACCESS_TOKEN = requiredStringOutput(
            billingOutputs,
            "app_stripe_api_token",
        );
        backendValues.STRIPE_WEBHOOK_VERIFICATION_KEY = requiredStringOutput(
            billingOutputs,
            "app_stripe_webhook_verification_key",
        );
        backendValues.STRIPE_PRODUCT_CATALOG_JSON = JSON.stringify(
            stripeCatalog(billingOutputs, options.profile),
        );
    }

    const plans = [
        await planEnvironmentFile(
            path.join(backendRoot, ".env"),
            path.join(backendRoot, ".env.template"),
            backendValues,
        ),
    ];
    if (Object.keys(frontendValues).length > 0) {
        plans.push(
            await planEnvironmentFile(
                path.join(frontendRoot, ".env.local"),
                path.join(frontendRoot, ".env.local.template"),
                frontendValues,
            ),
        );
    }
    if (Object.keys(endToEndValues).length > 0) {
        const endToEndRoot = path.join(options.root, "apps/backend-e2e");
        plans.push(
            await planEnvironmentFile(
                path.join(endToEndRoot, ".env"),
                path.join(endToEndRoot, ".env.template"),
                endToEndValues,
            ),
        );
    }
    return plans;
}

export async function setupProject(
    options: SetupOptions,
): Promise<SetupResult> {
    const changes: SetupChange[] = [];
    const steps: SetupStep[] = [];
    const inputPlans = await planTerraformInputs(options);
    for (const [capability, plan] of inputPlans) {
        if (plan.change) {
            changes.push(relativeChange(options.root, plan.change));
        }
        if (options.shouldApplyTerraform) {
            await applyFilePlan(plan);
            steps.push({
                id: `terraform.inputs.${capability}`,
                status: plan.change ? "applied" : "unchanged",
                message: plan.change
                    ? `Updated ${capability} Terraform inputs.`
                    : `${capability} Terraform inputs are unchanged.`,
            });
        } else {
            steps.push({
                id: `terraform.inputs.${capability}`,
                status: plan.change ? "planned" : "unchanged",
                message: plan.change
                    ? `Would update ${capability} Terraform inputs.`
                    : `${capability} Terraform inputs are unchanged.`,
            });
        }
    }

    const outputs = new Map<SetupCapability, TerraformOutputs>();
    let hasUnavailableOutputs = false;
    for (const capability of options.capabilities) {
        if (capability === "auth") {
            continue;
        }
        const projectPath = infrastructurePath(
            options.root,
            options.config,
            options.profile,
            capability,
        );
        if (options.shouldApplyTerraform) {
            await applyTerraform(projectPath, options.isJson);
            steps.push({
                id: `terraform.apply.${capability}`,
                status: "applied",
                message: `Applied ${capability} Terraform configuration.`,
            });
        }
        try {
            outputs.set(capability, await readTerraformOutputs(projectPath));
        } catch (error) {
            if (!options.canSkipUnavailableOutputs) {
                throw error;
            }
            hasUnavailableOutputs = true;
            steps.push({
                id: `terraform.outputs.${capability}`,
                status: "planned",
                message: `No ${capability} Terraform outputs are available yet; environment sync will follow apply.`,
            });
        }
    }

    const envPlans = await environmentPlans(options, outputs);
    const hasEnvironmentChanges = envPlans.some((plan) => plan.change);
    if (options.capabilities.includes("auth")) {
        steps.push({
            id: "auth.configure",
            status: !hasEnvironmentChanges
                ? "unchanged"
                : options.shouldWriteEnvironment
                  ? "applied"
                  : "planned",
            message: !hasEnvironmentChanges
                ? "Self-hosted Better Auth configuration is already synchronized."
                : options.shouldWriteEnvironment
                  ? "Configured self-hosted Better Auth environment."
                  : "Would configure self-hosted Better Auth environment.",
        });
    }
    for (const plan of envPlans) {
        if (plan.change) {
            changes.push(relativeChange(options.root, plan.change));
        }
        if (options.shouldWriteEnvironment) {
            await applyFilePlan(plan);
        }
    }
    if (hasUnavailableOutputs) {
        steps.push({
            id: "environment.sync",
            status: "planned",
            message:
                "Would synchronize application environment files after Terraform apply.",
        });
    } else {
        steps.push({
            id: "environment.sync",
            status:
                hasEnvironmentChanges && options.shouldWriteEnvironment
                    ? "applied"
                    : hasEnvironmentChanges
                      ? "planned"
                      : "unchanged",
            message: hasEnvironmentChanges
                ? options.shouldWriteEnvironment
                    ? "Synchronized application environment files."
                    : "Would synchronize application environment files."
                : "Application environment files are already synchronized.",
        });
    }

    return {
        ok: true,
        profile: options.profile,
        capabilities: options.capabilities,
        applied: options.shouldApplyTerraform || options.shouldWriteEnvironment,
        changed: changes.length > 0 || hasUnavailableOutputs,
        changes,
        steps,
        credentials: await credentialInstructions({
            root: options.root,
            config: options.config,
            profile: options.profile,
            capabilities: options.capabilities,
        }),
    };
}
