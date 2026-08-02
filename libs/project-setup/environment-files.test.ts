import {mkdtemp, readFile, rm, writeFile} from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import {
    applyFilePlan,
    planEnvironmentFile,
    planTerraformVariablesFile,
    readEnvironmentFile,
} from "./environment-files.js";

describe("environment file synchronization", () => {
    let root: string;

    beforeEach(async () => {
        root = await mkdtemp(path.join(os.tmpdir(), "miller-env-"));
    });

    afterEach(async () => {
        await rm(root, {recursive: true, force: true});
    });

    it("preserves unmanaged values and becomes a no-op after the first apply", async () => {
        const template = path.join(root, ".env.template");
        const target = path.join(root, ".env");
        await writeFile(
            template,
            "# keep this comment\nCUSTOM_VALUE=mine\nSTRIPE_PRODUCT_CATALOG_JSON=\n",
        );
        const catalog = JSON.stringify({
            starter: {priceId: "price_123", mode: "subscription"},
        });

        const firstPlan = await planEnvironmentFile(target, template, {
            STRIPE_PRODUCT_CATALOG_JSON: catalog,
        });
        expect(firstPlan.change).toEqual({
            target,
            action: "create",
            keys: ["STRIPE_PRODUCT_CATALOG_JSON"],
        });
        await applyFilePlan(firstPlan);
        expect(await readFile(target, "utf8")).toContain("CUSTOM_VALUE=mine");
        expect(await readFile(target, "utf8")).toContain(
            "STRIPE_PRODUCT_CATALOG_JSON='{",
        );
        expect((await readEnvironmentFile(target)).get("STRIPE_PRODUCT_CATALOG_JSON"))
            .toBe(catalog);

        const secondPlan = await planEnvironmentFile(target, template, {
            STRIPE_PRODUCT_CATALOG_JSON: catalog,
        });
        expect(secondPlan.change).toBeUndefined();
    });

    it("reports keys without including secret values", async () => {
        const template = path.join(root, ".env.template");
        const target = path.join(root, ".env");
        await writeFile(template, "STRIPE_ACCESS_TOKEN=\n");
        const secret = "sk_test_secret-value";

        const plan = await planEnvironmentFile(target, template, {
            STRIPE_ACCESS_TOKEN: secret,
        });
        expect(JSON.stringify(plan.change)).not.toContain(secret);
        expect(plan.change?.keys).toEqual(["STRIPE_ACCESS_TOKEN"]);
    });

    it("preserves terraform fmt alignment when values are unchanged", async () => {
        const template = path.join(root, "terraform.tfvars.template");
        const target = path.join(root, "terraform.tfvars");
        await writeFile(template, 'short = ""\n');
        await writeFile(
            target,
            'short     = "same"\nlong_name = "preserved"\n',
        );

        const plan = await planTerraformVariablesFile(target, template, {
            short: "same",
        });

        expect(plan.change).toBeUndefined();
        expect(plan.contents).toContain('short     = "same"');
    });

    it("decodes JSON stored inside a quoted Terraform string", async () => {
        const target = path.join(root, "terraform.tfvars");
        const catalog = JSON.stringify({
            starter: {priceId: "price_123", mode: "subscription"},
        });
        await writeFile(
            target,
            `app_stripe_product_catalog_json = ${JSON.stringify(catalog)}\n`,
        );

        expect(
            (await readEnvironmentFile(target)).get(
                "app_stripe_product_catalog_json",
            ),
        ).toBe(catalog);
    });
});
