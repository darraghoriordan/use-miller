import { cp, glob, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const workspaceRoot = path.resolve(packageRoot, "../..");
const target = path.join(packageRoot, "template");

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
                const lineStart = source.lastIndexOf(
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
    throw new Error("Could not parse Terraform backend block while preparing template.");
}

async function removeMaintainerBackends(root: string): Promise<void> {
    for await (const relativePath of glob("infrastructure/**/provider.tf", {
        cwd: root,
    })) {
        const filePath = path.join(root, relativePath);
        const source = await readFile(filePath, "utf8");
        await writeFile(filePath, withoutConfiguredBackend(source), "utf8");
    }
}

async function assertPublishableSharedLibrary(root: string): Promise<void> {
    const packagePath = path.join(root, "apps/backend/package.json");
    const packageJson = JSON.parse(await readFile(packagePath, "utf8")) as {
        dependencies?: Record<string, string>;
    };
    const version =
        packageJson.dependencies?.["@darraghor/nest-backend-libs"];
    if (!version || /^(?:file|link):/u.test(version)) {
        throw new Error(
            "The Miller template cannot be packed with a local nest-backend-libs dependency. Publish the shared library major release and use its npm version first.",
        );
    }
}

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
                    segment.endsWith(".tfvars") ||
                    segment.endsWith(".tfstate") ||
                    segment.includes(".tfstate.") ||
                    segment.endsWith(".tfplan") ||
                    (segment.startsWith(".env") && !segment.endsWith(".template")),
                );
            },
        });
        await removeMaintainerBackends(stagedTemplate);
        await assertPublishableSharedLibrary(stagedTemplate);
        await cp(
            path.join(stagedTemplate, ".gitignore"),
            path.join(stagedTemplate, "gitignore"),
        );
        await cp(stagedTemplate, target, { recursive: true });
    } finally {
        await rm(stagingRoot, { recursive: true, force: true });
    }
}

await main();
