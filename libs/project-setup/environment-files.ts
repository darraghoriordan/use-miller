import {randomUUID} from "node:crypto";
import {access, readFile, rename, unlink, writeFile} from "node:fs/promises";
import path from "node:path";
import type {SetupChange} from "./miller-types.js";

export interface FilePlan {
    target: string;
    contents: string;
    change?: SetupChange;
}

async function fileExists(filePath: string): Promise<boolean> {
    try {
        await access(filePath);
        return true;
    } catch {
        return false;
    }
}

function formatEnvironmentValue(value: string): string {
    if (value === "") {
        return "";
    }
    try {
        const parsed = JSON.parse(value) as unknown;
        if (typeof parsed === "object" && parsed !== null) {
            // dotenv treats single-quoted values literally, so JSON quotes survive.
            // Apostrophes can only occur inside JSON strings and remain valid as unicode.
            return `'${value.replaceAll("'", "\\u0027")}'`;
        }
    } catch {
        // Continue with normal dotenv string formatting.
    }
    if (/^[A-Za-z0-9_./:@+-]+$/.test(value)) {
        return value;
    }
    return JSON.stringify(value);
}

function patchAssignments(
    source: string,
    values: Readonly<Record<string, string>>,
    formatValue: (value: string) => string,
    keysToRemove: ReadonlySet<string> = new Set(),
    separator = "=",
): {contents: string; changedKeys: string[]} {
    const pending = new Map(Object.entries(values));
    const changedKeys: string[] = [];
    const lines = source.replaceAll("\r\n", "\n").split("\n");
    const patchedLines = lines.flatMap((line) => {
        const match = /^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=/.exec(line);
        const key = match?.[1];
        if (key && keysToRemove.has(key)) {
            changedKeys.push(key);
            pending.delete(key);
            return [];
        }
        if (!key || !pending.has(key)) {
            return [line];
        }
        const formattedValue = formatValue(pending.get(key) ?? "");
        const equalsIndex = line.indexOf("=");
        if (
            equalsIndex >= 0 &&
            line.slice(equalsIndex + 1).trim() === formattedValue
        ) {
            pending.delete(key);
            return [line];
        }
        const replacement = `${key}${separator}${formattedValue}`;
        pending.delete(key);
        if (replacement !== line) {
            changedKeys.push(key);
        }
        return [replacement];
    });

    if (pending.size > 0) {
        if (patchedLines.at(-1) !== "") {
            patchedLines.push("");
        }
        for (const [key, value] of pending) {
            patchedLines.push(`${key}${separator}${formatValue(value)}`);
            changedKeys.push(key);
        }
    }

    return {
        contents: `${patchedLines.join("\n").replace(/\n+$/, "")}\n`,
        changedKeys: [...new Set(changedKeys)].sort(),
    };
}

export async function planEnvironmentFile(
    target: string,
    template: string,
    values: Readonly<Record<string, string>>,
): Promise<FilePlan> {
    const doesTargetExist = await fileExists(target);
    const source = await readFile(doesTargetExist ? target : template, "utf8");
    const patched = patchAssignments(source, values, formatEnvironmentValue);
    return {
        target,
        contents: patched.contents,
        change:
            !doesTargetExist || patched.changedKeys.length > 0
                ? {
                      target,
                      action: doesTargetExist ? "update" : "create",
                      keys: patched.changedKeys,
                  }
                : undefined,
    };
}

export async function planTerraformVariablesFile(
    target: string,
    template: string,
    values: Readonly<Record<string, string>>,
    keysToRemove: readonly string[] = [],
): Promise<FilePlan> {
    const doesTargetExist = await fileExists(target);
    const source = await readFile(doesTargetExist ? target : template, "utf8");
    const patched = patchAssignments(
        source,
        values,
        JSON.stringify,
        new Set(keysToRemove),
        " = ",
    );
    return {
        target,
        contents: patched.contents,
        change:
            !doesTargetExist || patched.changedKeys.length > 0
                ? {
                      target,
                      action: doesTargetExist ? "update" : "create",
                      keys: patched.changedKeys,
                  }
                : undefined,
    };
}

export async function applyFilePlan(plan: FilePlan): Promise<void> {
    if (!plan.change) {
        return;
    }
    const temporaryPath = path.join(
        path.dirname(plan.target),
        `.${path.basename(plan.target)}.${randomUUID()}.tmp`,
    );
    try {
        await writeFile(temporaryPath, plan.contents, {encoding: "utf8", mode: 0o600});
        await rename(temporaryPath, plan.target);
    } finally {
        await unlink(temporaryPath).catch(() => undefined);
    }
}

export async function readEnvironmentFile(
    filePath: string,
): Promise<Map<string, string>> {
    if (!(await fileExists(filePath))) {
        return new Map();
    }
    const values = new Map<string, string>();
    const contents = await readFile(filePath, "utf8");
    for (const line of contents.split(/\r?\n/)) {
        const match = /^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/.exec(
            line,
        );
        if (!match?.[1]) {
            continue;
        }
        const rawValue = match[2] ?? "";
        let value = rawValue;
        if (rawValue.startsWith('"') && rawValue.endsWith('"')) {
            try {
                const decoded = JSON.parse(rawValue) as unknown;
                value = typeof decoded === "string" ? decoded : rawValue;
            } catch {
                // Keep supporting simple dotenv strings that are not JSON literals.
                value = rawValue
                    .slice(1, -1)
                    .replaceAll("\\n", "\n")
                    .replaceAll("\\r", "\r");
            }
        } else if (rawValue.startsWith("'") && rawValue.endsWith("'")) {
            value = rawValue.slice(1, -1);
        }
        values.set(match[1], value);
    }
    return values;
}
