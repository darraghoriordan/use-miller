import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { createProject } from "./create-miller.js";

describe("create-miller", () => {
    let root: string;
    let template: string;

    beforeEach(async () => {
        root = await mkdtemp(path.join(os.tmpdir(), "create-miller-"));
        template = path.join(root, "template");
        await mkdir(template);
        await writeFile(
            path.join(template, "miller.config.json"),
            JSON.stringify({ project: { name: "Miller", slug: "miller" } }),
        );
        await writeFile(path.join(template, "package.json"), JSON.stringify({ name: "miller" }));
        process.env.MILLER_TEMPLATE_DIR = template;
    });

    afterEach(async () => {
        delete process.env.MILLER_TEMPLATE_DIR;
        await rm(root, { recursive: true, force: true });
    });

    it("creates and configures a project without installing", async () => {
        const target = path.join(root, "reliable-app");
        const result = await createProject({
            target,
            isJson: false,
            shouldInstall: false,
            shouldShowHelp: false,
        });

        expect(result.project).toEqual({ name: "Reliable App", slug: "reliable-app" });
        const config = JSON.parse(await readFile(path.join(target, "miller.config.json"), "utf8"));
        const packageJson = JSON.parse(await readFile(path.join(target, "package.json"), "utf8"));
        expect(config.project).toEqual(result.project);
        expect(packageJson.name).toBe("reliable-app");
    });

    it("refuses to overwrite an existing target", async () => {
        const target = path.join(root, "existing");
        await mkdir(target);

        await expect(createProject({
            target,
            isJson: false,
            shouldInstall: false,
            shouldShowHelp: false,
        })).rejects.toThrow("Target already exists");
    });
});
