import { cp, mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const workspaceRoot = path.resolve(packageRoot, "../..");
const target = path.join(packageRoot, "template");

async function main(): Promise<void> {
    await rm(target, { recursive: true, force: true });
    if (process.argv.includes("--clean")) {
        return;
    }

    const excludedNames = new Set([
        ".git",
        ".next",
        ".terraform",
        "coverage",
        "dist",
        "node_modules",
        "template",
        "tsconfig.tsbuildinfo",
    ]);

    const stagingRoot = await mkdtemp(path.join(os.tmpdir(), "miller-template-"));
    const stagedTemplate = path.join(stagingRoot, "template");
    try {
        await cp(workspaceRoot, stagedTemplate, {
            recursive: true,
            filter: (source) => {
                const relativePath = path.relative(workspaceRoot, source);
                if (relativePath === "libs/create-miller" || relativePath.startsWith(`libs/create-miller${path.sep}`)) {
                    return false;
                }
                return !relativePath.split(path.sep).some((segment) =>
                    excludedNames.has(segment) ||
                    (segment.startsWith(".env") && !segment.endsWith(".template")),
                );
            },
        });
        await cp(stagedTemplate, target, { recursive: true });
    } finally {
        await rm(stagingRoot, { recursive: true, force: true });
    }
}

await main();
