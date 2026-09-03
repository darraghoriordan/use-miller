import { spawn } from "node:child_process";
import { access } from "node:fs/promises";
import path from "node:path";
import { credentialInstructions } from "./credential-instructions.js";
import { readEnvironmentFile } from "./environment-files.js";
import type {
    Capability,
    CapabilityReport,
    ConfigurationReport,
    InfrastructureReport,
    MillerConfig,
    ProjectReport,
    ReportRecommendation,
    ServiceReport,
    SetupCapability,
    SetupProfile,
} from "./miller-types.js";
import { readTerraformOutputs } from "./terraform-runner.js";

interface EnvironmentRequirement {
    application?: "backend" | "frontend";
    file?: string;
    relativePath?: string;
    keys: string[];
}

interface CapabilityDefinition {
    requirements: EnvironmentRequirement[];
    services: string[];
}

interface ComposeProcess {
    Service?: string;
    State?: string;
}

const capabilityOrder: Capability[] = [
    "auth",
    "billing",
    "email",
    "jobs",
    "observability",
    "ai",
];

const capabilityDefinitions: Record<Capability, CapabilityDefinition> = {
    auth: {
        requirements: [
            {
                application: "backend",
                file: ".env",
                keys: [
                    "BETTER_AUTH_SECRET",
                    "BETTER_AUTH_URL",
                    "GOOGLE_CLIENT_ID",
                    "GOOGLE_CLIENT_SECRET",
                ],
            },
            {
                application: "frontend",
                file: ".env.local",
                keys: ["APP_BASE_URL", "NEXT_PUBLIC_API_BASE_PATH"],
            },
        ],
        services: [],
    },
    billing: {
        requirements: [
            {
                application: "backend",
                file: ".env",
                keys: [
                    "STRIPE_ACCESS_TOKEN",
                    "STRIPE_WEBHOOK_VERIFICATION_KEY",
                    "STRIPE_PRODUCT_CATALOG_JSON",
                ],
            },
        ],
        services: [],
    },
    email: {
        requirements: [
            {
                application: "backend",
                file: ".env",
                keys: [
                    "SMTP_EMAIL_HOST",
                    "SMTP_EMAIL_PORT",
                    "SMTP_EMAIL_USERNAME",
                    "SMTP_EMAIL_PASSWORD",
                    "EMAIL_SENDER_ADDRESS",
                    "EMAIL_SENDER_NAME",
                    "EMAIL_SYNC_SEND_ENABLED",
                ],
            },
        ],
        services: [],
    },
    jobs: {
        requirements: [
            { application: "backend", file: ".env", keys: ["REDIS_URL"] },
        ],
        services: ["redis"],
    },
    observability: {
        requirements: [
            {
                application: "backend",
                file: ".env",
                keys: [
                    "OTEL_EXPORTER_OTLP_ENDPOINT",
                    "OTEL_TRACES_EXPORTER",
                    "OTEL_SDK_DISABLED",
                ],
            },
        ],
        services: ["jaeger", "otel-collector", "prometheus"],
    },
    ai: { requirements: [], services: [] },
};

function productionRequirements(
    config: MillerConfig,
    capability: Capability,
): EnvironmentRequirement[] {
    const relativePath = `${
        config.infrastructure?.profiles.production.environment ??
        "infrastructure/production/dokku-app"
    }/terraform.tfvars`;
    const keys: Record<Capability, string[]> = {
        auth: [
            "app_better_auth_secret",
            "app_better_auth_url",
            "app_google_client_id",
            "app_google_client_secret",
            "frontend_app_base_url",
            "frontend_app_api_base_path",
        ],
        billing: [
            "app_stripe_access_token",
            "app_stripe_webhook_verification_key",
            "app_stripe_product_catalog_json",
        ],
        email: [
            "app_smtp_email_host",
            "app_smtp_email_port",
            "app_smtp_email_username",
            "app_smtp_email_password",
            "app_email_sender_address",
            "app_email_sender_name",
            "app_smtp_email_sync_send_enabled",
        ],
        jobs: [],
        observability: [
            "otel_exporter_otlp_endpoint",
            "otel_traces_exporter",
            "otel_sdk_disabled",
        ],
        ai: [],
    };
    return keys[capability].length > 0
        ? [{ relativePath, keys: keys[capability] }]
        : [];
}

async function fileExists(filePath: string): Promise<boolean> {
    try {
        await access(filePath);
        return true;
    } catch {
        return false;
    }
}

function applicationPath(
    root: string,
    config: MillerConfig,
    application: "backend" | "frontend",
): string {
    return path.join(root, config.applications[application]);
}

function isNonEmpty(value: string | undefined): boolean {
    return typeof value === "string" && value.trim().length > 0;
}

function isValidCatalog(value: string | undefined): boolean {
    if (!value) {
        return false;
    }
    try {
        const catalog = JSON.parse(value) as unknown;
        return (
            typeof catalog === "object" &&
            catalog !== null &&
            !Array.isArray(catalog) &&
            Object.keys(catalog).length > 0
        );
    } catch {
        return false;
    }
}

async function capabilityConfiguration(
    root: string,
    config: MillerConfig,
    capability: Capability,
    profile: SetupProfile,
): Promise<ConfigurationReport> {
    const definition =
        profile === "local"
            ? capabilityDefinitions[capability]
            : {
                  ...capabilityDefinitions[capability],
                  requirements: productionRequirements(config, capability),
              };
    const presentKeys: string[] = [];
    const missingKeys: string[] = [];
    const sources: string[] = [];
    const notes: string[] = [];

    for (const requirement of definition.requirements) {
        const sourcePath = requirement.relativePath
            ? path.join(root, requirement.relativePath)
            : path.join(
                  applicationPath(root, config, requirement.application!),
                  requirement.file!,
              );
        sources.push(path.relative(root, sourcePath));
        const environment = await readEnvironmentFile(sourcePath);
        for (const key of requirement.keys) {
            const value = environment.get(key);
            const isPresent =
                key === "STRIPE_PRODUCT_CATALOG_JSON" ||
                  key === "app_stripe_product_catalog_json"
                    ? isValidCatalog(value)
                    : isNonEmpty(value);
            (isPresent ? presentKeys : missingKeys).push(key);
        }
        if (
            capability === "email" &&
            environment.get(
                profile === "local"
                    ? "EMAIL_SYNC_SEND_ENABLED"
                    : "app_smtp_email_sync_send_enabled",
            ) !== "true"
        ) {
            notes.push(
                profile === "local"
                    ? "Local email delivery is intentionally disabled; messages are not sent."
                    : "Synchronous email delivery is disabled for this profile.",
            );
        }
        if (
            capability === "email" &&
            [
                environment.get("SMTP_EMAIL_HOST"),
                environment.get("SMTP_EMAIL_USERNAME"),
                environment.get("SMTP_EMAIL_PASSWORD"),
                environment.get("EMAIL_SENDER_ADDRESS"),
            ].some((value) =>
                /myserver|mymillerapp|email_login|email_password/i.test(
                    value ?? "",
                ),
            )
        ) {
            notes.push(
                "SMTP configuration still contains starter placeholder values.",
            );
        }
        if (
            capability === "observability" &&
            environment.get("OTEL_SDK_DISABLED") === "true"
        ) {
            notes.push("The OpenTelemetry SDK is disabled for this profile.");
        }
    }

    if (capability === "ai") {
        const aiModule = path.join(
            root,
            config.applications.backend,
            "src/ai-core/ai-core.module.ts",
        );
        sources.push(path.relative(root, aiModule));
        if (await fileExists(aiModule)) {
            presentKeys.push("AI_CORE_MODULE");
        } else {
            missingKeys.push("AI_CORE_MODULE");
        }
    }

    const uniquePresent = [...new Set(presentKeys)].sort();
    const uniqueMissing = [...new Set(missingKeys)].sort();
    const isDevelopment = capability === "email" && notes.length > 0;
    return {
        status:
            uniqueMissing.length > 0
                ? "unconfigured"
                : isDevelopment
                  ? "development"
                  : "configured",
        sources: [...new Set(sources)].sort(),
        presentKeys: uniquePresent,
        missingKeys: uniqueMissing,
        notes,
    };
}

function infrastructurePath(
    root: string,
    config: MillerConfig,
    profile: SetupProfile,
    capability: SetupCapability,
): string | undefined {
    const configuredPath =
        config.infrastructure?.profiles[profile]?.[capability];
    return configuredPath ? path.join(root, configuredPath) : undefined;
}

async function infrastructureReport(
    root: string,
    config: MillerConfig,
    profile: SetupProfile,
    capability: SetupCapability,
    isDeep: boolean,
): Promise<InfrastructureReport | undefined> {
    const projectPath = infrastructurePath(root, config, profile, capability);
    if (!projectPath) {
        return undefined;
    }
    const relativePath = path.relative(root, projectPath);
    const variablesPath = path.join(projectPath, "terraform.tfvars");
    const isVariablesPresent = await fileExists(variablesPath);
    const isInitialized = await fileExists(
        path.join(projectPath, ".terraform"),
    );
    let outputs: InfrastructureReport["outputs"] = "not-checked";
    if (isDeep) {
        try {
            const values = await readTerraformOutputs(projectPath);
            outputs =
                Object.keys(values).length > 0 ? "available" : "unavailable";
        } catch {
            outputs = "unavailable";
        }
    }
    return {
        provider: "terraform",
        profile,
        path: relativePath,
        status:
            !(await fileExists(projectPath)) || !isVariablesPresent
                ? "unconfigured"
                : isDeep && outputs === "unavailable"
                  ? "unknown"
                  : "configured",
        variables: isVariablesPresent ? "configured" : "missing",
        initialized: isInitialized,
        outputs,
    };
}

async function runComposePs(
    projectPath: string,
): Promise<Map<string, "running" | "stopped"> | undefined> {
    return await new Promise((resolve) => {
        const child = spawn(
            "docker",
            ["compose", "ps", "--all", "--format", "json"],
            {
                cwd: projectPath,
                shell: false,
                stdio: ["ignore", "pipe", "ignore"],
            },
        );
        let stdout = "";
        child.stdout.setEncoding("utf8");
        child.stdout.on("data", (chunk: string) => {
            stdout += chunk;
        });
        child.once("error", () => resolve(undefined));
        child.once("exit", (code) => {
            if (code !== 0) {
                resolve(undefined);
                return;
            }
            try {
                const trimmed = stdout.trim();
                const parsed: ComposeProcess[] = trimmed.startsWith("[")
                    ? (JSON.parse(trimmed) as ComposeProcess[])
                    : trimmed
                          .split("\n")
                          .filter(Boolean)
                          .map((line) => JSON.parse(line) as ComposeProcess);
                resolve(
                    new Map(
                        parsed
                            .filter((entry) => entry.Service)
                            .map((entry) => [
                                entry.Service as string,
                                entry.State?.toLowerCase() === "running"
                                    ? "running"
                                    : "stopped",
                            ]),
                    ),
                );
            } catch {
                resolve(undefined);
            }
        });
    });
}

async function serviceReports(
    root: string,
    config: MillerConfig,
    isDeep: boolean,
    profile: SetupProfile,
): Promise<ServiceReport[]> {
    if (profile === "production") {
        return [];
    }
    const services = Object.entries(config.services ?? {});
    const composeResults = new Map<
        string,
        Map<string, "running" | "stopped"> | undefined
    >();
    if (isDeep) {
        for (const [, service] of services) {
            const applicationRoot = applicationPath(
                root,
                config,
                service.application,
            );
            if (!composeResults.has(applicationRoot)) {
                composeResults.set(
                    applicationRoot,
                    await runComposePs(applicationRoot),
                );
            }
        }
    }

    const reports: ServiceReport[] = [];
    for (const [id, service] of services) {
        const isEnabled =
            !service.capability || config.capabilities[service.capability];
        const applicationRoot = applicationPath(
            root,
            config,
            service.application,
        );
        const environment = await readEnvironmentFile(
            path.join(
                applicationRoot,
                service.application === "backend" ? ".env" : ".env.local",
            ),
        );
        const missingKeys = (service.requiredEnvironment ?? []).filter(
            (key) => !isNonEmpty(environment.get(key)),
        );
        const isSourcePresent = await fileExists(
            path.join(root, service.source),
        );
        const compose = composeResults.get(applicationRoot);
        const runtime = !isDeep
            ? "not-checked"
            : compose
              ? (compose.get(service.composeService) ?? "stopped")
              : "unavailable";
        let status: ServiceReport["status"];
        if (!isEnabled) {
            status = "disabled";
        } else if (!isSourcePresent || missingKeys.length > 0) {
            status = "unconfigured";
        } else if (!isDeep) {
            status = "configured";
        } else if (runtime === "running") {
            status = "running";
        } else if (runtime === "stopped") {
            status = "stopped";
        } else {
            status = "unknown";
        }
        reports.push({
            id,
            kind: service.kind,
            capability: service.capability,
            status,
            source: service.source,
            composeService: service.composeService,
            missingKeys,
            runtime,
        });
    }
    return reports;
}

function recommendations(
    capabilities: CapabilityReport[],
    services: ServiceReport[],
    profile: SetupProfile,
): ReportRecommendation[] {
    const values: ReportRecommendation[] = [];
    for (const capability of capabilities) {
        if (capability.status !== "attention") {
            continue;
        }
        const hasConfigurationProblem =
            capability.configuration.status !== "configured";
        const hasInfrastructureProblem =
            capability.infrastructure?.status !== undefined &&
            capability.infrastructure.status !== "configured";
        if (capability.id === "auth" && hasConfigurationProblem) {
            values.push({
                id: "configure.auth",
                severity: "error",
                message: "Generate and synchronize the self-hosted auth configuration.",
                command: `pnpm run mill -- setup --profile ${profile} --only auth --apply --yes`,
                mutates: "local",
            });
        } else if (
            capability.id === "billing" &&
            (hasConfigurationProblem || hasInfrastructureProblem)
        ) {
            const shouldReadFromEnvironment =
                capability.infrastructure?.variables !== "configured";
            values.push({
                id: `configure.${capability.id}`,
                severity: "error",
                message: `Plan ${capability.id} provider setup and review the reported changes.`,
                command: `pnpm run mill -- setup --profile ${profile} --only ${capability.id}${shouldReadFromEnvironment ? " --from-env" : ""} --dry-run --json`,
                mutates: "none",
            });
        } else if (capability.id === "email" && hasConfigurationProblem) {
            values.push({
                id: "configure.email",
                severity: "warning",
                message:
                    "Configure production SMTP values and enable delivery before relying on email.",
                mutates: "local",
            });
        } else if (hasConfigurationProblem) {
            values.push({
                id: `configure.${capability.id}`,
                severity: "warning",
                message: `Complete the missing ${capability.id} configuration reported above.`,
                mutates: "local",
            });
        }
    }

    const serviceAttention = services.filter((service) =>
        ["unconfigured", "stopped", "unknown"].includes(service.status),
    );
    if (serviceAttention.some((service) => service.status === "stopped")) {
        values.push({
            id: "services.start",
            severity: "warning",
            message: "Start configured local infrastructure services.",
            command: "pnpm --dir apps/backend run up",
            mutates: "local",
        });
    }
    if (serviceAttention.some((service) => service.status === "unknown")) {
        values.push({
            id: "services.inspect",
            severity: "warning",
            message: "Docker Compose runtime state could not be inspected.",
            command: "docker compose --project-directory apps/backend ps --all",
            mutates: "none",
        });
    }
    return values;
}

export async function reportProject(options: {
    root: string;
    config: MillerConfig;
    profile: SetupProfile;
    isDeep: boolean;
}): Promise<ProjectReport> {
    const infrastructure: InfrastructureReport[] = [];
    const capabilities: CapabilityReport[] = [];
    for (const capability of capabilityOrder) {
        const enabled = options.config.capabilities[capability];
        const configuration = await capabilityConfiguration(
            options.root,
            options.config,
            capability,
            options.profile,
        );
        const providerInfrastructure =
            capability === "billing"
                ? await infrastructureReport(
                      options.root,
                      options.config,
                      options.profile,
                      capability,
                      options.isDeep,
                  )
                : undefined;
        if (providerInfrastructure) {
            infrastructure.push(providerInfrastructure);
        }
        const hasConfigurationProblem =
            configuration.status === "unconfigured" ||
            (configuration.status === "development" &&
                options.profile === "production");
        const status: CapabilityReport["status"] = !enabled
            ? "disabled"
            : hasConfigurationProblem ||
                (providerInfrastructure &&
                    providerInfrastructure.status !== "configured")
              ? "attention"
              : "ready";
        capabilities.push({
            id: capability,
            enabled,
            status,
            configuration,
            infrastructure: providerInfrastructure,
            services: capabilityDefinitions[capability].services,
        });
    }

    const services = await serviceReports(
        options.root,
        options.config,
        options.isDeep,
        options.profile,
    );
    for (const capability of capabilities) {
        if (
            capability.status === "ready" &&
            capability.services.some((id) => {
                const service = services.find((value) => value.id === id);
                return (
                    service &&
                    ["unconfigured", "stopped", "unknown"].includes(
                        service.status,
                    )
                );
            })
        ) {
            capability.status = "attention";
        }
    }

    const nextActions = recommendations(
        capabilities,
        services,
        options.profile,
    );
    const enabled = capabilities.filter((capability) => capability.enabled);
    const serviceAttention = services.filter((service) =>
        ["unconfigured", "stopped", "unknown"].includes(service.status),
    ).length;
    return {
        ok: true,
        schemaVersion: 1,
        profile: options.profile,
        deep: options.isDeep,
        project: options.config.project,
        summary: {
            status:
                enabled.some(
                    (capability) => capability.status === "attention",
                ) || serviceAttention > 0
                    ? "attention"
                    : "ready",
            enabledCapabilities: enabled.length,
            readyCapabilities: enabled.filter(
                (capability) => capability.status === "ready",
            ).length,
            attentionCapabilities: enabled.filter(
                (capability) => capability.status === "attention",
            ).length,
            disabledCapabilities: capabilities.length - enabled.length,
            runningServices: services.filter(
                (service) => service.status === "running",
            ).length,
            serviceAttention,
        },
        capabilities,
        infrastructure,
        services,
        recommendations: nextActions,
        credentials: await credentialInstructions({
            root: options.root,
            config: options.config,
            profile: options.profile,
            capabilities: (["auth", "billing"] as SetupCapability[]).filter(
                (capability) => options.config.capabilities[capability],
            ),
        }),
    };
}
