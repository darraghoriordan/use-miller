import {spawn} from "node:child_process";
import {unlink} from "node:fs/promises";
import path from "node:path";

export interface TerraformOutput<T = unknown> {
    sensitive: boolean;
    type: unknown;
    value: T;
}

export type TerraformOutputs = Record<string, TerraformOutput>;

async function runCaptured(
    command: string,
    arguments_: string[],
    cwd: string,
): Promise<string> {
    return await new Promise<string>((resolve, reject) => {
        const child = spawn(command, arguments_, {
            cwd,
            shell: false,
            stdio: ["ignore", "pipe", "pipe"],
        });
        let stdout = "";
        child.stdout.setEncoding("utf8");
        child.stdout.on("data", (chunk: string) => {
            stdout += chunk;
        });
        child.stderr.resume();
        child.once("error", reject);
        child.once("exit", (code) => {
            if (code === 0) {
                resolve(stdout);
                return;
            }
            reject(
                new Error(
                    `${command} ${arguments_.join(" ")} failed in ${path.basename(cwd)}.`,
                ),
            );
        });
    });
}

async function runInherited(
    command: string,
    arguments_: string[],
    cwd: string,
    shouldSuppressOutput: boolean,
): Promise<void> {
    await new Promise<void>((resolve, reject) => {
        const child = spawn(command, arguments_, {
            cwd,
            shell: false,
            stdio: shouldSuppressOutput ? "ignore" : "inherit",
        });
        child.once("error", reject);
        child.once("exit", (code) => {
            if (code === 0) {
                resolve();
                return;
            }
            reject(
                new Error(
                    `${command} ${arguments_[0] ?? ""} failed in ${path.basename(cwd)}.`,
                ),
            );
        });
    });
}

export async function isTerraformAvailable(): Promise<boolean> {
    try {
        await runCaptured("terraform", ["version", "-json"], process.cwd());
        return true;
    } catch {
        return false;
    }
}

export async function readTerraformOutputs(
    projectPath: string,
): Promise<TerraformOutputs> {
    const stdout = await runCaptured("terraform", ["output", "-json"], projectPath);
    try {
        return JSON.parse(stdout) as TerraformOutputs;
    } catch (error) {
        throw new Error(`Terraform returned invalid JSON in ${projectPath}.`, {
            cause: error,
        });
    }
}

export async function applyTerraform(
    projectPath: string,
    shouldSuppressOutput: boolean,
): Promise<void> {
    const planPath = path.join(projectPath, ".miller.tfplan");
    try {
        await runInherited(
            "terraform",
            ["init", "-input=false"],
            projectPath,
            shouldSuppressOutput,
        );
        await runInherited(
            "terraform",
            ["plan", "-input=false", `-out=${planPath}`],
            projectPath,
            shouldSuppressOutput,
        );
        await runInherited(
            "terraform",
            ["apply", "-input=false", "-auto-approve", planPath],
            projectPath,
            shouldSuppressOutput,
        );
    } finally {
        await unlink(planPath).catch(() => undefined);
    }
}

export function requiredStringOutput(
    outputs: TerraformOutputs,
    key: string,
): string {
    const value = outputs[key]?.value;
    if (typeof value !== "string" || value.length === 0) {
        throw new Error(`Terraform output ${key} is missing.`);
    }
    return value;
}
