#!/usr/bin/env node

import { spawn } from "node:child_process";
import { access, cp, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

interface Options {
    target?: string;
    name?: string;
    slug?: string;
    isJson: boolean;
    shouldInstall: boolean;
    shouldShowHelp: boolean;
}

interface CreateResult {
    ok: true;
    target: string;
    project: { name: string; slug: string };
    installed: boolean;
    next: string[];
}

function parseArguments(arguments_: string[]): Options {
    const options: Options = {
        isJson: false,
        shouldInstall: true,
        shouldShowHelp: false,
    };

    for (let index = 0; index < arguments_.length; index += 1) {
        const argument = arguments_[index];
        if (!argument) {
            continue;
        }
        if (argument === "--json") {
            options.isJson = true;
            continue;
        }
        if (argument === "--no-install") {
            options.shouldInstall = false;
            continue;
        }
        if (argument === "--yes" || argument === "-y") {
            continue;
        }
        if (argument === "--help" || argument === "-h") {
            options.shouldShowHelp = true;
            continue;
        }
        const [key, inlineValue] = argument.split("=", 2);
        if (key === "--name" || key === "--slug") {
            const value = inlineValue ?? arguments_[index + 1];
            if (!value) {
                throw new Error(`${key} requires a value.`);
            }
            if (!inlineValue) {
                index += 1;
            }
            if (key === "--name") {
                options.name = value;
            } else {
                options.slug = value;
            }
            continue;
        }
        if (argument.startsWith("-")) {
            throw new Error(`Unknown option: ${argument}`);
        }
        if (options.target) {
            throw new Error(`Unexpected argument: ${argument}`);
        }
        options.target = argument;
    }
    return options;
}

function toSlug(value: string): string {
    return value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function toName(slug: string): string {
    return slug
        .split("-")
        .filter(Boolean)
        .map((part) => `${part[0]?.toUpperCase() ?? ""}${part.slice(1)}`)
        .join(" ");
}

async function exists(filePath: string): Promise<boolean> {
    try {
        await access(filePath);
        return true;
    } catch {
        return false;
    }
}

async function run(
    command: string,
    arguments_: string[],
    cwd: string,
    isJson: boolean,
): Promise<void> {
    await new Promise<void>((resolve, reject) => {
        const child = spawn(command, arguments_, {
            cwd,
            shell: false,
            stdio: isJson ? ["ignore", "ignore", "inherit"] : "inherit",
        });
        child.once("error", reject);
        child.once("exit", (code) => {
            if (code === 0) {
                resolve();
                return;
            }
            reject(new Error(`${command} ${arguments_.join(" ")} exited with code ${code ?? 1}.`));
        });
    });
}

function templateDirectory(): string {
    if (process.env.MILLER_TEMPLATE_DIR) {
        return path.resolve(process.env.MILLER_TEMPLATE_DIR);
    }
    const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
    return path.join(packageRoot, "template");
}

export async function createProject(options: Options): Promise<CreateResult> {
    if (!options.target) {
        throw new Error("Provide a target directory, for example: pnpm create miller my-app");
    }

    const target = path.resolve(options.target);
    if (await exists(target)) {
        throw new Error(`Target already exists: ${target}`);
    }

    const template = templateDirectory();
    if (!(await exists(path.join(template, "miller.config.json")))) {
        throw new Error("The Miller template is missing from this package. Reinstall create-miller and try again.");
    }

    const targetBaseName = path.basename(target);
    const slug = options.slug ?? toSlug(targetBaseName);
    if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
        throw new Error("--slug must be lowercase kebab-case.");
    }
    const name = options.name ?? toName(slug);

    await cp(template, target, { recursive: true, errorOnExist: true });

    const configPath = path.join(target, "miller.config.json");
    const config = JSON.parse(await readFile(configPath, "utf8")) as {
        project: { name: string; slug: string };
    };
    config.project = { name, slug };
    await writeFile(configPath, `${JSON.stringify(config, undefined, 4)}\n`, "utf8");

    const packagePath = path.join(target, "package.json");
    const packageJson = JSON.parse(await readFile(packagePath, "utf8")) as {
        name: string;
    };
    packageJson.name = slug;
    await writeFile(packagePath, `${JSON.stringify(packageJson, undefined, 4)}\n`, "utf8");

    if (options.shouldInstall) {
        await run("pnpm", ["install"], target, options.isJson);
        await run("pnpm", ["run", "mill", "--", "doctor"], target, options.isJson);
    }

    return {
        ok: true,
        target,
        project: { name, slug },
        installed: options.shouldInstall,
        next: [`cd ${options.target}`, options.shouldInstall ? "pnpm run mill:dev" : "pnpm install"],
    };
}

function showHelp(): void {
    console.log(`Create a Miller application

Usage:
  pnpm create miller@latest <target> [options]

Options:
  --name <name>       Application display name
  --slug <slug>       Lowercase package and project slug
  --no-install        Create files without installing dependencies
  --json              Print a machine-readable result
  --yes, -y           Accept defaults (provided for automation)
  --help, -h          Show this help`);
}

function showResult(result: CreateResult): void {
    console.log(`\nMiller created ${result.project.name}.\n`);
    console.log(`  ${result.target}`);
    console.log("\nNext steps:\n");
    for (const command of result.next) {
        console.log(`  ${command}`);
    }
    console.log("");
}

async function main(): Promise<void> {
    const options = parseArguments(process.argv.slice(2));
    if (options.shouldShowHelp) {
        showHelp();
        return;
    }
    const result = await createProject(options);
    if (options.isJson) {
        console.log(JSON.stringify(result, undefined, 2));
        return;
    }
    showResult(result);
}

if (process.env.VITEST !== "true") {
    main().catch((error: unknown) => {
        const message = error instanceof Error ? error.message : String(error);
        if (process.argv.includes("--json")) {
            console.error(JSON.stringify({ ok: false, error: message }));
        } else {
            console.error(`create-miller: ${message}`);
        }
        process.exitCode = 1;
    });
}
