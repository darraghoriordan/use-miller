#!/usr/bin/env node

import { spawn } from "node:child_process";
import { access, cp, glob, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { parseArgs } from "node:util";
import { readEnvironmentFile } from "./environment-files.js";
import type {
    Capability,
    CheckResult,
    MillerConfig,
    MultiProfileReport,
    ProjectReport,
    SetupCapability,
    SetupProfile,
    SetupResult,
} from "./miller-types.js";
import { reportProject } from "./report-project.js";
import { setupProject } from "./setup-project.js";
import { applyTerraform, isTerraformAvailable } from "./terraform-runner.js";

interface CliOptions {
    command: string;
    positional: string[];
    isJson: boolean;
    isDryRun: boolean;
    projectName?: string;
    projectSlug?: string;
    scope?: string;
    profile?: string;
    only?: string;
    isApply: boolean;
    isYes: boolean;
    isFromEnvironment: boolean;
    isDeep: boolean;
    shouldShowHelp: boolean;
}

const configFileName = "miller.config.json";
const supportedCapabilities = new Set<Capability>([
    "ai",
    "auth",
    "billing",
    "email",
    "jobs",
    "observability",
]);

function parseArguments(args: string[]): CliOptions {
    const normalizedArguments = args[0] === "--" ? args.slice(1) : args;
    const { values, positionals } = parseArgs({
        args: normalizedArguments,
        allowPositionals: true,
        strict: true,
        options: {
            json: { type: "boolean" },
            "dry-run": { type: "boolean" },
            name: { type: "string" },
            slug: { type: "string" },
            scope: { type: "string" },
            profile: { type: "string" },
            only: { type: "string" },
            apply: { type: "boolean" },
            yes: { type: "boolean", short: "y" },
            "from-env": { type: "boolean" },
            deep: { type: "boolean" },
            help: { type: "boolean", short: "h" },
        },
    });
    const positional = [...positionals];

    return {
        command: positional.shift() ?? "help",
        positional,
        isJson: values.json ?? false,
        isDryRun: values["dry-run"] ?? false,
        projectName: values.name,
        projectSlug: values.slug,
        scope: values.scope,
        profile: values.profile,
        only: values.only,
        isApply: values.apply ?? false,
        isYes: values.yes ?? false,
        isFromEnvironment: values["from-env"] ?? false,
        isDeep: values.deep ?? false,
        shouldShowHelp: values.help ?? false,
    };
}

async function findProjectRoot(
    startDirectory = process.cwd(),
): Promise<string> {
    let directory = path.resolve(startDirectory);
    while (true) {
        try {
            await access(path.join(directory, configFileName));
            return directory;
        } catch {
            const parent = path.dirname(directory);
            if (parent === directory) {
                throw new Error(
                    `Could not find ${configFileName}. Run mill from a Miller project.`,
                );
            }
            directory = parent;
        }
    }
}

async function readConfig(root: string): Promise<MillerConfig> {
    const contents = await readFile(path.join(root, configFileName), "utf8");
    const config = JSON.parse(contents) as MillerConfig;
    if (config.schemaVersion !== 1) {
        throw new Error(
            `Unsupported Miller schema version: ${config.schemaVersion}`,
        );
    }
    return config;
}

function output(value: unknown, isJson: boolean): void {
    if (isJson) {
        console.log(JSON.stringify(value, undefined, 2));
        return;
    }
    if (typeof value === "string") {
        console.log(value);
        return;
    }
    console.log(JSON.stringify(value, undefined, 2));
}

function outputDoctor(checks: CheckResult[], isJson: boolean): void {
    const hasFailures = checks.some((check) => check.status === "fail");
    if (isJson) {
        output({ ok: !hasFailures, checks }, true);
        return;
    }

    for (const check of checks) {
        const label = check.status.toUpperCase().padEnd(4);
        console.log(`${label}  ${check.id}`);
        if (check.status !== "pass") {
            console.log(`      ${check.message}`);
        }
        if (check.fix) {
            console.log(`      Fix: ${check.fix}`);
        }
    }

    const passed = checks.filter((check) => check.status === "pass").length;
    const warnings = checks.filter((check) => check.status === "warn").length;
    console.log("");
    if (hasFailures) {
        const failures = checks.length - passed - warnings;
        console.log(
            `${failures} check${failures === 1 ? "" : "s"} failed. Resolve the fixes above, then run mill doctor again.`,
        );
        return;
    }
    console.log(
        `${passed} checks passed${warnings ? `, ${warnings} warning${warnings === 1 ? "" : "s"}` : ""}. Ready to build.`,
    );
}

async function fileExists(filePath: string): Promise<boolean> {
    try {
        await access(filePath);
        return true;
    } catch {
        return false;
    }
}

function configurationStatus(
    isConfigured: boolean,
    isDeep: boolean,
): "pass" | "fail" | "warn" {
    if (isConfigured) {
        return "pass";
    }
    return isDeep ? "fail" : "warn";
}

async function doctor(
    root: string,
    config: MillerConfig,
    isDeep: boolean,
): Promise<CheckResult[]> {
    const checks: CheckResult[] = [];
    const nodeMajor = Number.parseInt(
        process.versions.node.split(".")[0] ?? "0",
        10,
    );
    checks.push({
        id: "runtime.node",
        status: nodeMajor === 24 ? "pass" : "warn",
        message: `Running Node.js ${process.versions.node}; the project baseline is ${config.runtime.node}.`,
        fix: nodeMajor === 24 ? undefined : "Switch to Node.js 24.",
    });

    for (const [id, relativePath] of Object.entries({
        "workspace.package": "package.json",
        "workspace.lockfile": "pnpm-lock.yaml",
        "backend.package": `${config.applications.backend}/package.json`,
        "frontend.package": `${config.applications.frontend}/package.json`,
        "backend.envTemplate": `${config.applications.backend}/.env.template`,
        "frontend.envTemplate": `${config.applications.frontend}/.env.local.template`,
    })) {
        const isPresent = await fileExists(path.join(root, relativePath));
        checks.push({
            id,
            status: isPresent ? "pass" : "fail",
            message: isPresent
                ? `${relativePath} is present.`
                : `${relativePath} is missing.`,
        });
    }

    const rootPackage = JSON.parse(
        await readFile(path.join(root, "package.json"), "utf8"),
    ) as { packageManager?: string };
    checks.push({
        id: "runtime.packageManager",
        status:
            rootPackage.packageManager === config.runtime.packageManager
                ? "pass"
                : "fail",
        message: `package.json uses ${rootPackage.packageManager ?? "no package manager"}; Miller expects ${config.runtime.packageManager}.`,
        fix:
            rootPackage.packageManager === config.runtime.packageManager
                ? undefined
                : "Keep package.json and miller.config.json on the same pinned pnpm version.",
    });

    if (config.capabilities.ai) {
        const aiCorePath = path.join(
            root,
            config.applications.backend,
            "src/ai-core/ai-core.module.ts",
        );
        const isPresent = await fileExists(aiCorePath);
        checks.push({
            id: "capability.ai",
            status: isPresent ? "pass" : "fail",
            message: isPresent
                ? "The provider-neutral AI core is present."
                : "AI is enabled but its backend core is missing.",
            fix: isPresent
                ? undefined
                : "Restore apps/backend/src/ai-core or disable AI.",
        });
    }

    if (config.capabilities.billing) {
        const isAvailable = await isTerraformAvailable();
        checks.push({
            id: "setup.terraform",
            status: configurationStatus(isAvailable, isDeep),
            message: isAvailable
                ? "Terraform is available."
                : "Terraform is required to configure billing infrastructure.",
            fix: isAvailable
                ? undefined
                : "Install Terraform and rerun mill doctor.",
        });
    }

    const backendEnvironment = await readEnvironmentFile(
        path.join(root, config.applications.backend, ".env"),
    );
    if (config.capabilities.auth) {
        const requiredKeys = ["BETTER_AUTH_SECRET", "BETTER_AUTH_URL"];
        const missingKeys = requiredKeys.filter(
            (key) => !backendEnvironment.get(key),
        );
        checks.push({
            id: "capability.auth.configuration",
            status: configurationStatus(missingKeys.length === 0, isDeep),
            message:
                missingKeys.length === 0
                    ? "Auth environment configuration is present."
                    : `Auth configuration is missing keys: ${missingKeys.join(", ")}.`,
            fix:
                missingKeys.length === 0
                    ? undefined
                    : "Run mill setup --only auth --apply --yes.",
        });
    }
    if (config.capabilities.billing) {
        const requiredKeys = [
            "STRIPE_ACCESS_TOKEN",
            "STRIPE_WEBHOOK_VERIFICATION_KEY",
        ];
        const missingKeys = requiredKeys.filter(
            (key) => !backendEnvironment.get(key),
        );
        const catalogJson = backendEnvironment.get(
            "STRIPE_PRODUCT_CATALOG_JSON",
        );
        let isCatalogValid = false;
        if (catalogJson) {
            try {
                const catalog = JSON.parse(catalogJson) as unknown;
                isCatalogValid =
                    typeof catalog === "object" &&
                    catalog !== null &&
                    !Array.isArray(catalog) &&
                    Object.keys(catalog).length > 0;
            } catch {
                isCatalogValid = false;
            }
        }
        if (!isCatalogValid) {
            missingKeys.push("STRIPE_PRODUCT_CATALOG_JSON");
        }
        checks.push({
            id: "capability.billing.configuration",
            status: configurationStatus(missingKeys.length === 0, isDeep),
            message:
                missingKeys.length === 0
                    ? "Billing environment configuration and product catalog are present."
                    : `Billing configuration is missing or invalid: ${missingKeys.join(", ")}.`,
            fix:
                missingKeys.length === 0
                    ? undefined
                    : "Run mill setup --only billing --apply --yes.",
        });
    }

    return checks;
}

async function writeConfig(
    root: string,
    config: MillerConfig,
    isDryRun: boolean,
): Promise<void> {
    if (!isDryRun) {
        await writeFile(
            path.join(root, configFileName),
            `${JSON.stringify(config, undefined, 4)}\n`,
            "utf8",
        );
    }
}

function withoutConfiguredBackend(source: string): string {
    const match = /\n\s*backend\s+"[^"]+"\s*\{/.exec(source);
    if (!match || match.index === undefined) {
        return source;
    }
    const blockStart = source.indexOf("backend", match.index);
    const openingBrace = source.indexOf("{", blockStart);
    let depth = 0;
    for (let index = openingBrace; index < source.length; index += 1) {
        if (source[index] === "{") {
            depth += 1;
        } else if (source[index] === "}") {
            depth -= 1;
            if (depth === 0) {
                const markerStart = source.lastIndexOf(
                    "# MILLER_TEMPLATE_BACKEND_START",
                    blockStart,
                );
                const explanatoryCommentStart = source.lastIndexOf(
                    "# You don't need this",
                    blockStart,
                );
                const lineStart =
                    source.lastIndexOf(
                        "\n",
                        (markerStart >= 0
                            ? markerStart
                            : explanatoryCommentStart >= 0
                              ? explanatoryCommentStart
                              : blockStart) - 1,
                    ) + 1;
                const markerEnd = source.indexOf(
                    "# MILLER_TEMPLATE_BACKEND_END",
                    index,
                );
                const lineEnd = source.indexOf(
                    "\n",
                    markerEnd >= 0 ? markerEnd : index,
                );
                return `${source.slice(0, lineStart)}${source.slice(lineEnd + 1)}`;
            }
        }
    }
    throw new Error(
        "Could not parse Terraform backend block while creating project.",
    );
}

async function removeMaintainerBackends(root: string): Promise<void> {
    for await (const relativePath of glob("infrastructure/**/provider.tf", {
        cwd: root,
    })) {
        const filePath = path.join(root, relativePath);
        if (!(await fileExists(filePath))) {
            continue;
        }
        const source = await readFile(filePath, "utf8");
        await writeFile(filePath, withoutConfiguredBackend(source), "utf8");
    }
}

async function runCommand(root: string, args: string[]): Promise<number> {
    return await new Promise<number>((resolve, reject) => {
        const child = spawn("pnpm", args, {
            cwd: root,
            stdio: "inherit",
            shell: false,
        });
        child.once("error", reject);
        child.once("exit", (code) => resolve(code ?? 1));
    });
}

function showHelp(): void {
    console.log(`Miller CLI

Usage:
  mill create <target> --name <name> --slug <slug> [--dry-run] [--json]
  mill describe [--json]
  mill report [--profile all|local|production] [--deep] [--json]
  mill doctor [--json]
  mill doctor --deep [--json]
  mill configure --name <name> --slug <slug> [--dry-run] [--json]
  mill add <capability> [--dry-run] [--json]
  mill setup [--profile local|production] [--only auth,billing] [--from-env] [--apply --yes] [--json]
  mill production [--from-env] [--apply --yes] [--json]
  mill env sync [--profile local|production] [--only auth,billing] [--dry-run] [--json]
  mill verify [--scope backend|frontend|setup]

Commands are non-interactive, deterministic, and safe to call from coding agents.`);
}

function outputProjectReport(report: ProjectReport, isJson: boolean): void {
    if (isJson) {
        output(report, true);
        return;
    }
    console.log(`${report.project.name} (${report.profile})`);
    console.log(`Status: ${report.summary.status.toUpperCase()}`);
    console.log("");
    console.log("Capabilities");
    for (const capability of report.capabilities) {
        console.log(
            `  ${capability.status.toUpperCase().padEnd(10)} ${capability.id}`,
        );
        if (capability.configuration.missingKeys.length > 0) {
            console.log(
                `             Missing: ${capability.configuration.missingKeys.join(", ")}`,
            );
        }
        for (const note of capability.configuration.notes) {
            console.log(`             ${note}`);
        }
    }
    console.log("");
    console.log("Infrastructure");
    for (const infrastructure of report.infrastructure) {
        console.log(
            `  ${infrastructure.status.toUpperCase().padEnd(12)} ${infrastructure.path} (outputs: ${infrastructure.outputs})`,
        );
    }
    console.log("");
    console.log("Services");
    for (const service of report.services) {
        console.log(
            `  ${service.status.toUpperCase().padEnd(12)} ${service.id}`,
        );
    }
    if (report.recommendations.length > 0) {
        console.log("");
        console.log("Next actions");
        for (const recommendation of report.recommendations) {
            console.log(
                `  ${recommendation.severity.toUpperCase()}  ${recommendation.message}`,
            );
            if (recommendation.command) {
                console.log(`         ${recommendation.command}`);
            }
        }
    }
    if (report.credentials.length > 0) {
        console.log("");
        console.log("Credentials");
        for (const credential of report.credentials) {
            const state = credential.configured
                ? "CONFIGURED"
                : credential.required
                  ? "REQUIRED"
                  : "OPTIONAL";
            console.log(`  ${state.padEnd(12)} ${credential.id}`);
            console.log(
                `               Destination: ${credential.destination}`,
            );
            if (credential.destinationKeys.length > 0) {
                console.log(
                    `               Keys: ${credential.destinationKeys.join(", ")}`,
                );
            }
            if (credential.environmentVariables.length > 0) {
                console.log(
                    `               Inputs: ${credential.environmentVariables.join(", ")}`,
                );
            }
            if (credential.sourceUrl) {
                console.log(`               Get it: ${credential.sourceUrl}`);
            }
            if (credential.relatedUrl) {
                console.log(
                    `               Configure URL: ${credential.relatedUrl}`,
                );
            }
        }
    }
}

function parseSetupProfile(profile: string | undefined): SetupProfile {
    if (!profile || profile === "local") {
        return "local";
    }
    if (profile === "production") {
        return "production";
    }
    throw new Error("--profile must be local or production.");
}

function parseReportProfiles(profile: string | undefined): SetupProfile[] {
    if (!profile || profile === "all") {
        return ["local", "production"];
    }
    return [parseSetupProfile(profile)];
}

function parseSetupCapabilities(
    only: string | undefined,
    config: MillerConfig,
): SetupCapability[] {
    const requested = only
        ? only.split(",").map((value) => value.trim())
        : (["auth", "billing"] as SetupCapability[]).filter(
              (capability) => config.capabilities[capability],
          );
    const supported = new Set<SetupCapability>(["auth", "billing"]);
    for (const capability of requested) {
        if (!supported.has(capability as SetupCapability)) {
            throw new Error("--only supports auth and billing.");
        }
    }
    return [...new Set(requested as SetupCapability[])];
}

function outputSetupResult(result: SetupResult, isJson: boolean): void {
    if (isJson) {
        output(result, true);
        return;
    }
    for (const step of result.steps) {
        console.log(`${step.status.toUpperCase().padEnd(9)} ${step.message}`);
    }
    if (result.credentials.length > 0) {
        console.log("");
        console.log("Credential sources");
        for (const credential of result.credentials.filter(
            (value) => !value.configured,
        )) {
            console.log(
                `  ${credential.required ? "REQUIRED" : "OPTIONAL"}  ${credential.id}: ${credential.instructions}`,
            );
            if (credential.sourceUrl) {
                console.log(`            ${credential.sourceUrl}`);
            }
        }
    }
    if (result.changes.length > 0) {
        console.log("");
        for (const change of result.changes) {
            console.log(
                `${change.action.toUpperCase().padEnd(6)} ${change.target} (${change.keys.join(", ")})`,
            );
        }
    }
    console.log("");
    console.log(
        result.changed
            ? result.applied
                ? "Setup applied successfully."
                : "Setup changes planned. Rerun with --apply --yes to apply them."
            : "Setup is already synchronized.",
    );
}

async function main(): Promise<void> {
    const options = parseArguments(process.argv.slice(2));
    if (options.command === "help" || options.shouldShowHelp) {
        showHelp();
        return;
    }

    const root = await findProjectRoot();
    const config = await readConfig(root);

    switch (options.command) {
        case "create": {
            const targetArgument = options.positional[0];
            if (
                !targetArgument ||
                !options.projectName ||
                !options.projectSlug
            ) {
                throw new Error(
                    "create requires a target, --name, and --slug.",
                );
            }
            if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(options.projectSlug)) {
                throw new Error("--slug must be lowercase kebab-case.");
            }
            const target = path.resolve(process.cwd(), targetArgument);
            if (target === root || target.startsWith(`${root}${path.sep}`)) {
                throw new Error(
                    "create target must be outside the source project.",
                );
            }
            if (await fileExists(target)) {
                throw new Error(`create target already exists: ${target}`);
            }
            if (!options.isDryRun) {
                const excludedNames = new Set([
                    ".git",
                    ".next",
                    ".terraform",
                    "coverage",
                    "dist",
                    "node_modules",
                    "tsconfig.tsbuildinfo",
                ]);
                await cp(root, target, {
                    recursive: true,
                    errorOnExist: true,
                    filter: (source) => {
                        const relativePath = path.relative(root, source);
                        return !relativePath
                            .split(path.sep)
                            .some(
                                (segment) =>
                                    excludedNames.has(segment) ||
                                    segment.endsWith(".tfvars") ||
                                    segment.endsWith(".tfstate") ||
                                    segment.includes(".tfstate.") ||
                                    segment.endsWith(".tfplan") ||
                                    (segment.startsWith(".env") &&
                                        !segment.endsWith(".template")),
                            );
                    },
                });
                await removeMaintainerBackends(target);
                const createdConfig = await readConfig(target);
                createdConfig.project = {
                    name: options.projectName,
                    slug: options.projectSlug,
                };
                await writeConfig(target, createdConfig, false);

                const packagePath = path.join(target, "package.json");
                const packageJson = JSON.parse(
                    await readFile(packagePath, "utf8"),
                ) as { name?: string };
                packageJson.name = options.projectSlug;
                await writeFile(
                    packagePath,
                    `${JSON.stringify(packageJson, undefined, 4)}\n`,
                    "utf8",
                );
            }
            output(
                {
                    ok: true,
                    dryRun: options.isDryRun,
                    target,
                    project: {
                        name: options.projectName,
                        slug: options.projectSlug,
                    },
                    next: [
                        `cd ${target}`,
                        "pnpm install",
                        "pnpm run mill -- report --profile all --json",
                        "pnpm run mill -- setup --from-env --dry-run --json",
                        "pnpm run mill -- doctor",
                    ],
                },
                options.isJson,
            );
            return;
        }
        case "describe":
            output({ root, ...config }, options.isJson);
            return;
        case "report": {
            const profiles = parseReportProfiles(options.profile);
            const reports = await Promise.all(
                profiles.map((profile) =>
                    reportProject({
                        root,
                        config,
                        profile,
                        isDeep: options.isDeep,
                    }),
                ),
            );
            if (reports.length === 1) {
                outputProjectReport(reports[0]!, options.isJson);
                return;
            }
            const report: MultiProfileReport = {
                ok: true,
                schemaVersion: 1,
                project: config.project,
                summary: {
                    status: reports.some(
                        (value) => value.summary.status === "attention",
                    )
                        ? "attention"
                        : "ready",
                },
                profiles: reports,
            };
            if (options.isJson) {
                output(report, true);
            } else {
                reports.forEach((value, index) => {
                    if (index > 0) {
                        console.log("\n---\n");
                    }
                    outputProjectReport(value, false);
                });
            }
            return;
        }
        case "doctor": {
            const checks = await doctor(root, config, options.isDeep);
            const hasFailures = checks.some((check) => check.status === "fail");
            outputDoctor(checks, options.isJson);
            if (hasFailures) {
                process.exitCode = 1;
            }
            return;
        }
        case "setup": {
            if (options.isApply && options.isDryRun) {
                throw new Error(
                    "--apply and --dry-run cannot be used together.",
                );
            }
            if (options.isApply && !options.isYes) {
                throw new Error("Setup apply requires --yes.");
            }
            const result = await setupProject({
                root,
                config,
                profile: parseSetupProfile(options.profile),
                capabilities: parseSetupCapabilities(options.only, config),
                shouldApplyTerraform: options.isApply,
                shouldWriteEnvironment: options.isApply,
                shouldReadInputsFromEnvironment: options.isFromEnvironment,
                canSkipUnavailableOutputs: !options.isApply,
                isJson: options.isJson,
            });
            outputSetupResult(result, options.isJson);
            return;
        }
        case "production": {
            if (options.profile || options.only) {
                throw new Error(
                    "mill production configures the complete production profile; do not pass --profile or --only.",
                );
            }
            if (options.isApply && options.isDryRun) {
                throw new Error(
                    "--apply and --dry-run cannot be used together.",
                );
            }
            if (options.isApply && !options.isYes) {
                throw new Error("Production apply requires --yes.");
            }

            const initialReport = await reportProject({
                root,
                config,
                profile: "production",
                isDeep: false,
            });
            const setupManagedCapabilities = new Set<Capability>([
                "auth",
                "billing",
            ]);
            const unmanagedBlockers = initialReport.capabilities.filter(
                (capability) =>
                    capability.enabled &&
                    capability.status === "attention" &&
                    !setupManagedCapabilities.has(capability.id),
            );
            if (options.isApply && unmanagedBlockers.length > 0) {
                throw new Error(
                    `Production configuration is incomplete for: ${unmanagedBlockers
                        .map((capability) => capability.id)
                        .join(
                            ", ",
                        )}. Run mill report --profile production --json and configure the reported keys before applying.`,
                );
            }

            const result = await setupProject({
                root,
                config,
                profile: "production",
                capabilities: parseSetupCapabilities(undefined, config),
                shouldApplyTerraform: options.isApply,
                shouldWriteEnvironment: options.isApply,
                shouldReadInputsFromEnvironment: options.isFromEnvironment,
                canSkipUnavailableOutputs: !options.isApply,
                isJson: options.isJson,
            });
            const deploymentRoot = path.join(
                root,
                config.infrastructure?.profiles.production.environment ??
                    "infrastructure/production/dokku-app",
            );
            if (options.isApply) {
                const configuredReport = await reportProject({
                    root,
                    config,
                    profile: "production",
                    isDeep: false,
                });
                const blockers = configuredReport.capabilities.filter(
                    (capability) =>
                        capability.enabled && capability.status === "attention",
                );
                if (blockers.length > 0) {
                    throw new Error(
                        `Production configuration remains incomplete for: ${blockers
                            .map((capability) => capability.id)
                            .join(
                                ", ",
                            )}. Resolve the production report before applying Dokku configuration.`,
                    );
                }
                await applyTerraform(deploymentRoot, options.isJson);
            }
            const finalReport = await reportProject({
                root,
                config,
                profile: "production",
                isDeep: options.isApply,
            });
            output(
                {
                    ...result,
                    command: "production",
                    steps: [
                        ...result.steps,
                        {
                            id: "terraform.apply.environment",
                            status: options.isApply ? "applied" : "planned",
                            message: options.isApply
                                ? "Applied production Dokku environment and services."
                                : "Would apply production Dokku environment and services after provider setup.",
                        },
                    ],
                    report: finalReport,
                },
                options.isJson,
            );
            return;
        }
        case "env": {
            if (options.positional[0] !== "sync") {
                throw new Error("Usage: mill env sync [--dry-run] [--json].");
            }
            const result = await setupProject({
                root,
                config,
                profile: parseSetupProfile(options.profile),
                capabilities: parseSetupCapabilities(options.only, config),
                shouldApplyTerraform: false,
                shouldWriteEnvironment: !options.isDryRun,
                shouldReadInputsFromEnvironment: false,
                canSkipUnavailableOutputs: false,
                isJson: options.isJson,
            });
            outputSetupResult(result, options.isJson);
            return;
        }
        case "configure": {
            if (!options.projectName || !options.projectSlug) {
                throw new Error("configure requires --name and --slug.");
            }
            if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(options.projectSlug)) {
                throw new Error("--slug must be lowercase kebab-case.");
            }
            config.project = {
                name: options.projectName,
                slug: options.projectSlug,
            };
            await writeConfig(root, config, options.isDryRun);
            output(
                { ok: true, dryRun: options.isDryRun, project: config.project },
                options.isJson,
            );
            return;
        }
        case "add": {
            const capability = options.positional[0] as Capability | undefined;
            if (!capability || !supportedCapabilities.has(capability)) {
                throw new Error(
                    `Unknown capability. Supported capabilities: ${[...supportedCapabilities].join(", ")}.`,
                );
            }
            const wasEnabled = config.capabilities[capability];
            config.capabilities[capability] = true;
            await writeConfig(root, config, options.isDryRun);
            output(
                {
                    ok: true,
                    dryRun: options.isDryRun,
                    capability,
                    changed: !wasEnabled,
                    message: wasEnabled
                        ? `${capability} is already enabled.`
                        : `${capability} enabled in ${configFileName}.`,
                },
                options.isJson,
            );
            return;
        }
        case "verify": {
            const filters: Record<string, string> = {
                backend: "@use-miller/app-backend-api",
                frontend: "@use-miller/frontend",
                setup: "@use-miller/project-setup",
            };
            const filter = options.scope ? filters[options.scope] : undefined;
            if (options.scope && !filter) {
                throw new Error("--scope must be backend, frontend, or setup.");
            }
            if (filter) {
                process.exitCode = await runCommand(root, [
                    "--filter",
                    filter,
                    "run",
                    "build",
                ]);
                return;
            }
            const backendExitCode = await runCommand(root, ["run", "build"]);
            if (backendExitCode !== 0) {
                process.exitCode = backendExitCode;
                return;
            }
            process.exitCode = await runCommand(root, [
                "--dir",
                config.applications.frontend,
                "run",
                "build",
            ]);
            return;
        }
        default:
            throw new Error(`Unknown command: ${options.command}`);
    }
}

main().catch((error: unknown) => {
    const message = error instanceof Error ? error.message : String(error);
    const isJson = process.argv.includes("--json");
    if (isJson) {
        console.error(JSON.stringify({ ok: false, error: message }));
    } else {
        console.error(`Miller error: ${message}`);
    }
    process.exitCode = 1;
});
