#!/usr/bin/env node

import { spawn } from "node:child_process";
import { access, cp, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

type Capability = "ai" | "auth" | "billing" | "email" | "jobs" | "observability";

interface MillerConfig {
    $schema?: string;
    schemaVersion: 1;
    project: { name: string; slug: string };
    runtime: { node: string; packageManager: string };
    applications: { backend: string; frontend: string };
    capabilities: Record<Capability, boolean>;
}

interface CliOptions {
    command: string;
    positional: string[];
    isJson: boolean;
    isDryRun: boolean;
    projectName?: string;
    projectSlug?: string;
    scope?: string;
}

interface CheckResult {
    id: string;
    status: "pass" | "fail" | "warn";
    message: string;
    fix?: string;
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
    const positional: string[] = [];
    const values = new Map<string, string>();
    const flags = new Set<string>();

    for (let index = 0; index < args.length; index += 1) {
        const argument = args[index];
        if (!argument) {
            continue;
        }
        if (!argument.startsWith("--")) {
            positional.push(argument);
            continue;
        }

        const [rawKey, inlineValue] = argument.slice(2).split("=", 2);
        if (!rawKey) {
            continue;
        }
        if (inlineValue !== undefined) {
            values.set(rawKey, inlineValue);
            continue;
        }
        const next = args[index + 1];
        if (next && !next.startsWith("--")) {
            values.set(rawKey, next);
            index += 1;
        } else {
            flags.add(rawKey);
        }
    }

    return {
        command: positional.shift() ?? "help",
        positional,
        isJson: flags.has("json"),
        isDryRun: flags.has("dry-run"),
        projectName: values.get("name"),
        projectSlug: values.get("slug"),
        scope: values.get("scope"),
    };
}

async function findProjectRoot(startDirectory = process.cwd()): Promise<string> {
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
        throw new Error(`Unsupported Miller schema version: ${config.schemaVersion}`);
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
        console.log(`${failures} check${failures === 1 ? "" : "s"} failed. Resolve the fixes above, then run mill doctor again.`);
        return;
    }
    console.log(`${passed} checks passed${warnings ? `, ${warnings} warning${warnings === 1 ? "" : "s"}` : ""}. Ready to build.`);
}

async function fileExists(filePath: string): Promise<boolean> {
    try {
        await access(filePath);
        return true;
    } catch {
        return false;
    }
}

async function doctor(root: string, config: MillerConfig): Promise<CheckResult[]> {
    const checks: CheckResult[] = [];
    const nodeMajor = Number.parseInt(process.versions.node.split(".")[0] ?? "0", 10);
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
            message: isPresent ? `${relativePath} is present.` : `${relativePath} is missing.`,
        });
    }

    const rootPackage = JSON.parse(
        await readFile(path.join(root, "package.json"), "utf8"),
    ) as { packageManager?: string };
    checks.push({
        id: "runtime.packageManager",
        status:
            rootPackage.packageManager === config.runtime.packageManager ? "pass" : "fail",
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
            fix: isPresent ? undefined : "Restore apps/backend/src/ai-core or disable AI.",
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

async function runCommand(root: string, args: string[]): Promise<number> {
    return await new Promise<number>((resolve, reject) => {
        const child = spawn("pnpm", args, { cwd: root, stdio: "inherit", shell: false });
        child.once("error", reject);
        child.once("exit", (code) => resolve(code ?? 1));
    });
}

function showHelp(): void {
    console.log(`Miller CLI

Usage:
  mill create <target> --name <name> --slug <slug> [--dry-run] [--json]
  mill describe [--json]
  mill doctor [--json]
  mill configure --name <name> --slug <slug> [--dry-run] [--json]
  mill add <capability> [--dry-run] [--json]
  mill verify [--scope backend|frontend|setup]

Commands are non-interactive, deterministic, and safe to call from coding agents.`);
}

async function main(): Promise<void> {
    const options = parseArguments(process.argv.slice(2));
    if (options.command === "help" || options.command === "--help") {
        showHelp();
        return;
    }

    const root = await findProjectRoot();
    const config = await readConfig(root);

    switch (options.command) {
        case "create": {
            const targetArgument = options.positional[0];
            if (!targetArgument || !options.projectName || !options.projectSlug) {
                throw new Error("create requires a target, --name, and --slug.");
            }
            if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(options.projectSlug)) {
                throw new Error("--slug must be lowercase kebab-case.");
            }
            const target = path.resolve(process.cwd(), targetArgument);
            if (target === root || target.startsWith(`${root}${path.sep}`)) {
                throw new Error("create target must be outside the source project.");
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
                            .some((segment) =>
                                excludedNames.has(segment) ||
                                (segment.startsWith(".env") &&
                                    !segment.endsWith(".template")),
                            );
                    },
                });
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
                    project: { name: options.projectName, slug: options.projectSlug },
                    next: [`cd ${target}`, "pnpm install", "pnpm run mill -- doctor"],
                },
                options.isJson,
            );
            return;
        }
        case "describe":
            output({ root, ...config }, options.isJson);
            return;
        case "doctor": {
            const checks = await doctor(root, config);
            const hasFailures = checks.some((check) => check.status === "fail");
            outputDoctor(checks, options.isJson);
            if (hasFailures) {
                process.exitCode = 1;
            }
            return;
        }
        case "configure": {
            if (!options.projectName || !options.projectSlug) {
                throw new Error("configure requires --name and --slug.");
            }
            if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(options.projectSlug)) {
                throw new Error("--slug must be lowercase kebab-case.");
            }
            config.project = { name: options.projectName, slug: options.projectSlug };
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
