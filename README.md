# Miller

Describe your app. Let your coding agent handle the setup.

Miller is an agent-ready, production-grade starting point for real web applications. It gives
Codex and other coding agents a deterministic way to create, inspect, configure, run, and
prepare a NestJS and Next.js application for production—while keeping you in control of
credentials and external changes.

## Create an app with Codex

Open Codex in the directory where you keep projects and paste one line:

```text
Follow https://usemiller.dev/start.md and create my app.
```

Codex will ask for the application name, derive its slug and directory, create the project,
inspect its local and production configuration, and walk you through only the decisions and
credentials that need human input. It will plan external changes before asking for approval
and will never need secret values pasted into the conversation.

- [Read the agent creation guide](https://usemiller.dev/start.md)
- [Browse all Miller products](https://usemiller.dev/products/index.md)
- [Give an agent the complete Miller index](https://usemiller.dev/llms.txt)

The same workflow is available as the reusable
[`create-miller` agent skill](skills/create-miller/SKILL.md). Once generated, every project
includes its own `AGENTS.md` and [`use-miller` skill](skills/use-miller/SKILL.md) for ongoing
development and operations.

## Quick start

Requirements: Node.js 24, pnpm 11, Docker, Google OAuth credentials, and a Stripe account
when billing is enabled. Authentication is self-hosted in the NestJS API; Google is the
only sign-in provider.

A fresh application can also be created directly from a terminal:

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

The first successful Google login with a verified email links to the single existing
application user with that email. Existing memberships, subscriptions, and domain data stay
on that user row; ambiguous duplicate-email matches fail closed.

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
