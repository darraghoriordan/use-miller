import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import {
    chmod,
    mkdir,
    mkdtemp,
    readFile,
    rm,
    writeFile,
} from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(packageRoot, "../..");
const cliPath = path.join(packageRoot, "dist/miller-setup.js");

function runCli(...args: string[]): Record<string, unknown> {
    const result = execFileSync(
        process.execPath,
        [cliPath, ...args, "--json"],
        {
            cwd: projectRoot,
            encoding: "utf8",
        },
    );
    return JSON.parse(result) as Record<string, unknown>;
}

async function createSetupFixture(): Promise<{
    root: string;
    executableDirectory: string;
}> {
    const root = await mkdtemp(path.join(os.tmpdir(), "miller-cli-"));
    const executableDirectory = path.join(root, "bin");
    await Promise.all([
        mkdir(path.join(root, "apps/backend"), { recursive: true }),
        mkdir(path.join(root, "apps/frontend"), { recursive: true }),
        mkdir(path.join(root, "apps/backend-e2e"), { recursive: true }),
        mkdir(path.join(root, "infrastructure/local-dev/stripe-dev"), {
            recursive: true,
        }),
        mkdir(path.join(root, "infrastructure/production/stripe-prod"), {
            recursive: true,
        }),
        mkdir(path.join(root, "infrastructure/production/dokku-app"), {
            recursive: true,
        }),
        mkdir(executableDirectory, { recursive: true }),
    ]);
    await writeFile(
        path.join(root, "miller.config.json"),
        JSON.stringify({
            schemaVersion: 1,
            project: { name: "Fixture App", slug: "fixture-app" },
            runtime: { node: "24.x", packageManager: "pnpm@11.17.0" },
            applications: {
                backend: "apps/backend",
                frontend: "apps/frontend",
            },
            capabilities: {
                auth: false,
                billing: true,
                email: false,
                jobs: false,
                observability: false,
                ai: false,
            },
            infrastructure: {
                provider: "terraform",
                profiles: {
                    local: { billing: "infrastructure/local-dev/stripe-dev" },
                    production: {
                        billing: "infrastructure/production/stripe-prod",
                        environment: "infrastructure/production/dokku-app",
                    },
                },
            },
            services: {
                postgres: {
                    kind: "database",
                    application: "backend",
                    source: "apps/backend/docker-compose.yml",
                    composeService: "db",
                },
            },
        }),
    );
    await writeFile(
        path.join(root, "apps/backend/.env.template"),
        "CUSTOM_VALUE=preserved\nSTRIPE_ACCESS_TOKEN=\nSTRIPE_WEBHOOK_VERIFICATION_KEY=\nSTRIPE_PRODUCT_CATALOG_JSON=\nCOMPOSE_PROJECT_NAME=\nAPP_POSTGRES_DATABASE=\nAPP_TITLE=\nEMAIL_SENDER_NAME=\n",
    );
    await writeFile(path.join(root, "apps/frontend/.env.local.template"), "");
    await writeFile(path.join(root, "apps/backend-e2e/.env.template"), "");
    await writeFile(
        path.join(root, "apps/backend/docker-compose.yml"),
        "services:\n  db:\n    image: postgres:17\n",
    );
    await writeFile(
        path.join(root, "package.json"),
        JSON.stringify({
            packageManager: "pnpm@11.17.0",
        }),
    );
    await writeFile(
        path.join(root, "pnpm-lock.yaml"),
        "lockfileVersion: '9.0'\n",
    );
    await writeFile(
        path.join(root, "infrastructure/local-dev/stripe-dev/terraform.tfvars"),
        'app_stripe_api_token = "configured"\n',
    );
    await writeFile(
        path.join(
            root,
            "infrastructure/local-dev/stripe-dev/terraform.tfvars.template",
        ),
        'app_stripe_api_token = ""\n',
    );
    await writeFile(
        path.join(
            root,
            "infrastructure/production/stripe-prod/terraform.tfvars.template",
        ),
        'app_stripe_api_token = ""\napp_stripe_webhook_url = ""\napp_stripe_customer_portal_privacy_url = ""\napp_stripe_customer_portal_header = ""\napp_stripe_customer_portal_terms_conditions_url = ""\napp_stripe_customer_portal_return_url = ""\n',
    );
    await writeFile(
        path.join(
            root,
            "infrastructure/production/dokku-app/terraform.tfvars.template",
        ),
        'app_better_auth_secret = ""\napp_better_auth_url = ""\napp_better_auth_cookie_domain = ""\napp_better_auth_require_email_verification = "true"\napp_google_client_id = ""\napp_google_client_secret = ""\napp_super_user_emails = ""\nfrontend_app_base_url = ""\nfrontend_app_api_base_path = ""\nfrontend_app_google_auth_enabled = "false"\napp_stripe_access_token = ""\napp_stripe_webhook_verification_key = ""\napp_stripe_product_catalog_json = ""\napp_stripe_redirects_base_url = ""\n',
    );
    const fakeTerraform = path.join(executableDirectory, "terraform");
    await writeFile(
        fakeTerraform,
        `#!/usr/bin/env node
const command = process.argv[2];
if (command === "version") {
    process.stdout.write(JSON.stringify({ terraform_version: "1.14.0" }));
} else if (command === "output") {
    if (process.env.MILLER_FAKE_NO_OUTPUTS === "true") {
        process.exit(1);
    }
    process.stdout.write(JSON.stringify({
        app_stripe_api_token: { sensitive: true, type: "string", value: "sk_test_do-not-print" },
        app_stripe_webhook_verification_key: { sensitive: true, type: "string", value: "whsec_do-not-print" },
        stripe_product_catalog: {
            sensitive: false,
            type: ["object", {}],
            value: {
                starter: {
                    priceId: "price_123456",
                    mode: "subscription",
                    internalSku: "starter",
                    displayName: "Starter"
                }
            }
        }
    }));
}
`,
    );
    await chmod(fakeTerraform, 0o755);
    const fakeDocker = path.join(executableDirectory, "docker");
    await writeFile(
        fakeDocker,
        `#!/usr/bin/env node
process.stdout.write(JSON.stringify({ Service: "db", State: "running" }) + "\\n");
`,
    );
    await chmod(fakeDocker, 0o755);
    return { root, executableDirectory };
}

function runFixtureCli(
    root: string,
    executableDirectory: string,
    environment: Record<string, string>,
    ...args: string[]
): { stdout: string; result: Record<string, unknown> } {
    const stdout = execFileSync(
        process.execPath,
        [cliPath, ...args, "--json"],
        {
            cwd: root,
            encoding: "utf8",
            env: {
                ...process.env,
                ...environment,
                PATH: `${executableDirectory}${path.delimiter}${process.env.PATH ?? ""}`,
            },
        },
    );
    return { stdout, result: JSON.parse(stdout) as Record<string, unknown> };
}

describe("Miller CLI", () => {
    it("describes the project from a nested directory", () => {
        const result = execFileSync(
            process.execPath,
            [cliPath, "describe", "--json"],
            {
                cwd: path.join(projectRoot, "apps/backend"),
                encoding: "utf8",
            },
        );
        const description = JSON.parse(result) as {
            schemaVersion: number;
            project: { slug: string };
        };

        expect(description.schemaVersion).toBe(1);
        expect(description.project.slug).toBe("use-miller");
    });

    it("accepts the argument separator forwarded by pnpm run", () => {
        const result = execFileSync(
            process.execPath,
            [cliPath, "--", "describe", "--json"],
            { cwd: projectRoot, encoding: "utf8" },
        );
        const description = JSON.parse(result) as { project: { slug: string } };
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

    it("synchronizes Terraform outputs without exposing secrets and is idempotent", async () => {
        const fixture = await createSetupFixture();
        try {
            const first = runFixtureCli(
                fixture.root,
                fixture.executableDirectory,
                {},
                "env",
                "sync",
                "--only",
                "billing",
            );
            expect(first.result.changed).toBe(true);
            expect(first.stdout).not.toContain("sk_test_do-not-print");
            expect(first.stdout).not.toContain("whsec_do-not-print");

            const environment = await readFile(
                path.join(fixture.root, "apps/backend/.env"),
                "utf8",
            );
            expect(environment).toContain("CUSTOM_VALUE=preserved");
            expect(environment).toContain("STRIPE_PRODUCT_CATALOG_JSON=");

            const second = runFixtureCli(
                fixture.root,
                fixture.executableDirectory,
                {},
                "env",
                "sync",
                "--only",
                "billing",
            );
            expect(second.result.changed).toBe(false);
        } finally {
            await rm(fixture.root, { recursive: true, force: true });
        }
    });

    it("plans environment synchronization without writing during a dry run", async () => {
        const fixture = await createSetupFixture();
        try {
            const planned = runFixtureCli(
                fixture.root,
                fixture.executableDirectory,
                {},
                "env",
                "sync",
                "--only",
                "billing",
                "--dry-run",
            );
            expect(planned.result.changed).toBe(true);
            await expect(
                readFile(path.join(fixture.root, "apps/backend/.env"), "utf8"),
            ).rejects.toThrow();
        } finally {
            await rm(fixture.root, { recursive: true, force: true });
        }
    });

    it("plans setup from process environment before Terraform outputs exist", async () => {
        const fixture = await createSetupFixture();
        try {
            const result = runFixtureCli(
                fixture.root,
                fixture.executableDirectory,
                {
                    MILLER_FAKE_NO_OUTPUTS: "true",
                    MILLER_STRIPE_ACCESS_TOKEN: "sk_test_do-not-print",
                    MILLER_STRIPE_WEBHOOK_VERIFICATION_KEY:
                        "whsec_do-not-print",
                },
                "setup",
                "--only",
                "billing",
                "--from-env",
                "--dry-run",
            );
            expect(result.result.changed).toBe(true);
            expect(result.stdout).not.toContain("sk_test_do-not-print");
            expect(result.stdout).not.toContain("whsec_do-not-print");
            const steps = result.result.steps as Array<{ id: string }>;
            expect(
                steps.some((step) => step.id === "terraform.outputs.billing"),
            ).toBe(true);
        } finally {
            await rm(fixture.root, { recursive: true, force: true });
        }
    });

    it("reports provider and service readiness without exposing values", async () => {
        const fixture = await createSetupFixture();
        try {
            runFixtureCli(
                fixture.root,
                fixture.executableDirectory,
                {},
                "env",
                "sync",
                "--only",
                "billing",
            );
            const report = runFixtureCli(
                fixture.root,
                fixture.executableDirectory,
                {},
                "report",
                "--profile",
                "local",
                "--deep",
            );
            expect(report.stdout).not.toContain("sk_test_do-not-print");
            expect(report.stdout).not.toContain("whsec_do-not-print");
            const summary = report.result.summary as {
                readyCapabilities: number;
                runningServices: number;
            };
            expect(summary.readyCapabilities).toBe(1);
            expect(summary.runningServices).toBe(1);
            const infrastructure = report.result.infrastructure as Array<{
                outputs: string;
            }>;
            expect(infrastructure[0]?.outputs).toBe("available");
        } finally {
            await rm(fixture.root, { recursive: true, force: true });
        }
    });

    it("configures Better Auth without Terraform and preserves its secret", async () => {
        const fixture = await createSetupFixture();
        try {
            const configPath = path.join(fixture.root, "miller.config.json");
            const config = JSON.parse(await readFile(configPath, "utf8")) as {
                capabilities: { auth: boolean };
            };
            config.capabilities.auth = true;
            await writeFile(configPath, JSON.stringify(config));

            runFixtureCli(
                fixture.root,
                fixture.executableDirectory,
                {},
                "setup",
                "--only",
                "auth",
                "--apply",
                "--yes",
            );
            const first = await readFile(
                path.join(fixture.root, "apps/backend/.env"),
                "utf8",
            );
            const secret = /BETTER_AUTH_SECRET=([^\n]+)/.exec(first)?.[1];
            expect(secret?.length).toBeGreaterThanOrEqual(32);

            const second = runFixtureCli(
                fixture.root,
                fixture.executableDirectory,
                {},
                "setup",
                "--only",
                "auth",
                "--apply",
                "--yes",
            );
            expect(second.result.changed).toBe(false);
            expect(
                await readFile(
                    path.join(fixture.root, "apps/backend/.env"),
                    "utf8",
                ),
            ).toContain(`BETTER_AUTH_SECRET=${secret}`);
            expect(
                await readFile(
                    path.join(fixture.root, "apps/backend/.env"),
                    "utf8",
                ),
            ).toContain("SUPER_USER_EMAILS=\n");
            expect(
                await readFile(
                    path.join(fixture.root, "apps/backend/.env"),
                    "utf8",
                ),
            ).not.toContain("SUPER_USER_EMAILS=owner@example.test");
        } finally {
            await rm(fixture.root, { recursive: true, force: true });
        }
    });

    it("uses Google credentials entered directly in the local backend environment", async () => {
        const fixture = await createSetupFixture();
        try {
            const configPath = path.join(fixture.root, "miller.config.json");
            const config = JSON.parse(await readFile(configPath, "utf8")) as {
                capabilities: { auth: boolean };
            };
            config.capabilities.auth = true;
            await writeFile(configPath, JSON.stringify(config));
            await writeFile(
                path.join(fixture.root, "apps/backend/.env"),
                "GOOGLE_CLIENT_ID=local-client\nGOOGLE_CLIENT_SECRET=local-secret-do-not-print\n",
            );

            const result = runFixtureCli(
                fixture.root,
                fixture.executableDirectory,
                {},
                "setup",
                "--profile",
                "local",
                "--only",
                "auth",
                "--apply",
                "--yes",
            );

            expect(result.stdout).not.toContain("local-secret-do-not-print");
            expect(
                await readFile(
                    path.join(fixture.root, "apps/frontend/.env.local"),
                    "utf8",
                ),
            ).toContain("NEXT_PUBLIC_GOOGLE_AUTH_ENABLED=true");
            expect(
                await readFile(
                    path.join(fixture.root, "apps/backend/.env"),
                    "utf8",
                ),
            ).toContain("GOOGLE_CLIENT_SECRET=local-secret-do-not-print");
        } finally {
            await rm(fixture.root, { recursive: true, force: true });
        }
    });

    it("reports when Google credentials and the frontend flag are out of sync", async () => {
        const fixture = await createSetupFixture();
        try {
            const configPath = path.join(fixture.root, "miller.config.json");
            const config = JSON.parse(await readFile(configPath, "utf8")) as {
                capabilities: { auth: boolean };
            };
            config.capabilities.auth = true;
            await writeFile(configPath, JSON.stringify(config));
            await writeFile(
                path.join(fixture.root, "apps/backend/.env"),
                "GOOGLE_CLIENT_ID=local-client\nGOOGLE_CLIENT_SECRET=local-secret-do-not-print\nBETTER_AUTH_SECRET=fixture-secret-with-at-least-thirty-two-characters\nBETTER_AUTH_URL=http://localhost:34522\n",
            );
            await writeFile(
                path.join(fixture.root, "apps/frontend/.env.local"),
                "APP_BASE_URL=http://localhost:3000\nNEXT_PUBLIC_API_BASE_PATH=http://localhost:34522\nNEXT_PUBLIC_GOOGLE_AUTH_ENABLED=false\n",
            );

            const report = runFixtureCli(
                fixture.root,
                fixture.executableDirectory,
                {},
                "report",
                "--profile",
                "local",
            ).result as unknown as {
                summary: { status: string };
                capabilities: Array<{
                    id: string;
                    status: string;
                    configuration: {
                        missingKeys: string[];
                        notes: string[];
                    };
                }>;
                recommendations: Array<{
                    id: string;
                    command?: string;
                }>;
            };
            const auth = report.capabilities.find(
                (capability) => capability.id === "auth",
            );

            expect(report.summary.status).toBe("attention");
            expect(auth?.status).toBe("attention");
            expect(auth?.configuration.missingKeys).toContain(
                "NEXT_PUBLIC_GOOGLE_AUTH_ENABLED",
            );
            expect(auth?.configuration.notes).toContain(
                "Google credentials and NEXT_PUBLIC_GOOGLE_AUTH_ENABLED are out of sync; run Miller environment sync.",
            );
            expect(
                report.recommendations.find(
                    (recommendation) => recommendation.id === "configure.auth",
                )?.command,
            ).toBe(
                "pnpm run mill -- setup --profile local --only auth --apply --yes",
            );
        } finally {
            await rm(fixture.root, { recursive: true, force: true });
        }
    });

    it("reports local and production profiles with credential acquisition guidance", async () => {
        const fixture = await createSetupFixture();
        try {
            const configPath = path.join(fixture.root, "miller.config.json");
            const config = JSON.parse(await readFile(configPath, "utf8")) as {
                capabilities: { auth: boolean };
            };
            config.capabilities.auth = true;
            await writeFile(configPath, JSON.stringify(config));
            const report = runFixtureCli(
                fixture.root,
                fixture.executableDirectory,
                {},
                "report",
                "--profile",
                "all",
            );
            const profiles = report.result.profiles as Array<{
                profile: string;
                credentials: Array<{
                    id: string;
                    sourceUrl?: string;
                    destination: string;
                }>;
            }>;
            expect(profiles.map((value) => value.profile)).toEqual([
                "local",
                "production",
            ]);
            const production = profiles.find(
                (value) => value.profile === "production",
            );
            expect(
                production?.credentials.find(
                    (value) => value.id === "stripe-api-key",
                )?.sourceUrl,
            ).toBe("https://dashboard.stripe.com/apikeys");
            expect(
                production?.credentials.find(
                    (value) => value.id === "better-auth",
                )?.destination,
            ).toBe("infrastructure/production/dokku-app/terraform.tfvars");
            expect(
                production?.credentials.find(
                    (value) => value.id === "owner-admin",
                )?.destination,
            ).toBe("infrastructure/production/dokku-app/terraform.tfvars");
        } finally {
            await rm(fixture.root, { recursive: true, force: true });
        }
    });

    it("writes production auth to Terraform variables and preserves it on reruns", async () => {
        const fixture = await createSetupFixture();
        try {
            const configPath = path.join(fixture.root, "miller.config.json");
            const config = JSON.parse(await readFile(configPath, "utf8")) as {
                capabilities: { auth: boolean };
            };
            config.capabilities.auth = true;
            await writeFile(configPath, JSON.stringify(config));
            await writeFile(
                path.join(
                    fixture.root,
                    "infrastructure/production/dokku-app/terraform.tfvars",
                ),
                'frontend_app_auth0_secret = "legacy-secret-do-not-print"\n',
            );

            const first = runFixtureCli(
                fixture.root,
                fixture.executableDirectory,
                {
                    MILLER_FRONTEND_BASE_URL: "https://example.test",
                    MILLER_BACKEND_BASE_URL: "https://api.example.test",
                    MILLER_GOOGLE_CLIENT_ID: "google-client",
                    MILLER_GOOGLE_CLIENT_SECRET: "google-secret-do-not-print",
                },
                "setup",
                "--profile",
                "production",
                "--only",
                "auth",
                "--apply",
                "--yes",
            );
            expect(first.stdout).not.toContain("google-secret-do-not-print");
            expect(first.stdout).not.toContain("legacy-secret-do-not-print");
            const target = path.join(
                fixture.root,
                "infrastructure/production/dokku-app/terraform.tfvars",
            );
            const variables = await readFile(target, "utf8");
            const secret = /app_better_auth_secret\s*=\s*"([^"]+)"/.exec(
                variables,
            )?.[1];
            expect(secret?.length).toBeGreaterThanOrEqual(32);
            expect(variables).toContain(
                'app_better_auth_url = "https://api.example.test"',
            );
            expect(variables).not.toContain("auth0");

            const second = runFixtureCli(
                fixture.root,
                fixture.executableDirectory,
                {},
                "setup",
                "--profile",
                "production",
                "--only",
                "auth",
                "--apply",
                "--yes",
            );
            expect(second.result.changed).toBe(false);
            expect(await readFile(target, "utf8")).toContain(
                `app_better_auth_secret = "${secret}"`,
            );
        } finally {
            await rm(fixture.root, { recursive: true, force: true });
        }
    });

    it("requires explicit confirmation before applying setup", () => {
        expect(() => runCli("setup", "--apply")).toThrow(
            "Setup apply requires --yes",
        );
    });

    it("rejects unknown options", () => {
        expect(() => runCli("doctor", "--jsoon")).toThrow("Unknown option");
    });
});
