import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(packageRoot, "../..");
const cliPath = path.join(packageRoot, "dist/miller-setup.js");

function runCli(...args: string[]): Record<string, unknown> {
    const result = execFileSync(process.execPath, [cliPath, ...args, "--json"], {
        cwd: projectRoot,
        encoding: "utf8",
    });
    return JSON.parse(result) as Record<string, unknown>;
}

describe("Miller CLI", () => {
    it("describes the project from a nested directory", () => {
        const result = execFileSync(process.execPath, [cliPath, "describe", "--json"], {
            cwd: path.join(projectRoot, "apps/backend"),
            encoding: "utf8",
        });
        const description = JSON.parse(result) as {
            schemaVersion: number;
            project: { slug: string };
        };

        expect(description.schemaVersion).toBe(1);
        expect(description.project.slug).toBe("use-miller");
    });

    it("reports a healthy project contract", () => {
        const result = runCli("doctor") as { ok: boolean };
        expect(result.ok).toBe(true);
    });

    it("does not write configuration during a dry run", () => {
        const configPath = path.join(projectRoot, "miller.config.json");
        const before = readFileSync(configPath, "utf8");

        const result = runCli(
            "configure",
            "--name",
            "Example App",
            "--slug",
            "example-app",
            "--dry-run",
        ) as { dryRun: boolean };

        expect(result.dryRun).toBe(true);
        expect(readFileSync(configPath, "utf8")).toBe(before);
    });

    it("is idempotent for an existing capability", () => {
        const result = runCli("add", "auth", "--dry-run") as {
            changed: boolean;
        };
        expect(result.changed).toBe(false);
    });

    it("plans project creation without writing during a dry run", () => {
        const result = runCli(
            "create",
            "../example-miller-app",
            "--name",
            "Example Miller App",
            "--slug",
            "example-miller-app",
            "--dry-run",
        ) as { dryRun: boolean; project: { slug: string } };

        expect(result.dryRun).toBe(true);
        expect(result.project.slug).toBe("example-miller-app");
    });
});
