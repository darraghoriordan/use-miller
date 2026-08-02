# Miller

Miller is an agent-ready, production-grade starting point for real web applications. It
combines a NestJS API, Next.js frontend, PostgreSQL, authentication, billing, background
jobs, email, and observability with a deterministic CLI that coding agents can inspect and
operate safely.

## Quick start

Requirements: Node.js 24, pnpm 11, Docker, and a Stripe account when billing is enabled.
Authentication is self-hosted in the NestJS API and needs no identity-provider account.

After `create-miller` is published, a fresh application can be created from anywhere:

```bash
pnpm create miller@latest my-app
```

The publishable package lives in `libs/create-miller` and bundles the matching Miller
template, so an installer version cannot silently fetch a different starter version.

```bash
pnpm install
pnpm run mill -- report --profile all --json
pnpm run mill -- setup --only auth --dry-run --json
pnpm run mill -- setup --only auth --apply --yes --json
pnpm run mill -- doctor --deep
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
pnpm run mill -- report --profile all --json
```

## Miller CLI

```bash
pnpm run mill -- doctor --json
pnpm run mill -- report --profile all --deep --json
pnpm run mill -- setup --from-env --dry-run --json
pnpm run mill -- setup --from-env --apply --yes --json
pnpm run mill -- env sync --json
pnpm run mill -- configure --name "My App" --slug my-app --dry-run --json
pnpm run mill -- add ai --dry-run --json
pnpm run mill -- verify --scope backend
```

Commands are non-interactive and locate the project root automatically. Configuration is
stored in `miller.config.json`. Use `--dry-run` before mutations and `--json` when calling
Miller from an agent or automation. Setup credentials are read from the process environment
or ignored Terraform variable files; they are never accepted as command arguments or
returned in JSON. See `libs/project-setup/README.md` for the complete setup contract.

`mill report --profile all` is the agent-facing inventory: it shows local and production
configuration separately, which capabilities are enabled, where credentials belong, where
to obtain them, which capabilities are ready, whether Terraform is configured, which local
services exist or are running, and the
next safe command for every gap. It reports key names and state only—never configuration
values.

Better Auth supports browser session cookies and signed bearer tokens. The same NestJS auth
contract works with the included Next.js frontend and independent browser SPAs. Its admin
API is mounted by NestJS at `/api/auth/admin/*`; configured owners receive the Better Auth
`admin` role and Miller's global backend permissions. Set `SUPER_USER_EMAILS` in the ignored
local backend environment or `app_super_user_emails` in production variables, then visit
`/super-admin` for identity and application operations.

`pnpm run mill:dev` waits for the local containers, builds the backend, applies pending
database migrations, and only then starts both applications. A fresh checkout therefore
gets the Better Auth and admin schema without a separate migration step.

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
