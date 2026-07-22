# Miller

Miller is an agent-ready, production-grade starting point for real web applications. It
combines a NestJS API, Next.js frontend, PostgreSQL, authentication, billing, background
jobs, email, and observability with a deterministic CLI that coding agents can inspect and
operate safely.

## Quick start

Requirements: Node.js 24, pnpm 10, Docker, an Auth0 tenant, and a Stripe account when
billing is enabled.

After `create-miller` is published, a fresh application can be created from anywhere:

```bash
pnpm create miller@latest my-app
```

The publishable package lives in `libs/create-miller` and bundles the matching Miller
template, so an installer version cannot silently fetch a different starter version.

```bash
pnpm install
pnpm run mill -- doctor
pnpm run mill:dev
```

To create a separate application from this source checkout:

```bash
pnpm run mill -- create ../my-app --name "My App" --slug my-app
cd ../my-app
pnpm install
pnpm run mill -- doctor
```

Inspect the project in a form suitable for an agent:

```bash
pnpm run mill -- describe --json
```

## Miller CLI

```bash
pnpm run mill -- doctor --json
pnpm run mill -- configure --name "My App" --slug my-app --dry-run --json
pnpm run mill -- add ai --dry-run --json
pnpm run mill -- verify --scope backend
```

Commands are non-interactive and locate the project root automatically. Configuration is
stored in `miller.config.json`. Use `--dry-run` before mutations and `--json` when calling
Miller from an agent or automation.

## Applications

- `apps/backend`: NestJS API and production application capabilities.
- `apps/frontend`: Next.js web application.
- `apps/backend-e2e`: authenticated API verification.
- `libs/project-setup`: source for the `mill` CLI.
- `skills/use-miller`: reusable agent workflow.

The optional `apps/backend/src/ai-core` capability supplies provider-neutral model and
tool interfaces. It does not force an AI vendor or expose application actions without
normal parsing and authorization.

Read `PRODUCT.md` for product intent, `ARCHITECTURE.md` for boundaries, `DESIGN.md` for UI
principles, and `AGENTS.md` for durable coding-agent instructions.
