# Miller agent guide

Miller is an agent-ready production application starter. Read `PRODUCT.md`,
`ARCHITECTURE.md`, `DESIGN.md`, and `miller.config.json` before making broad changes.

## Start here

Run these read-only commands before changing the project:

```bash
pnpm run mill -- describe --json
pnpm run mill -- report --profile all --json
pnpm run mill -- doctor --json
git status --short
```

Prefer `mill` commands when a matching capability exists. They are the stable interface
for project configuration and must remain non-interactive, idempotent, dry-run capable,
and machine-readable. Do not implement broad text replacement in the CLI.

Use `report` as the agent inventory and `doctor` as the verification gate. `report` always
returns a redacted document, even when the project needs attention. It distinguishes enabled,
ready, development-only, unconfigured, disabled, running, stopped, and unknown state and
provides scoped next commands. Add `--deep` only when Terraform output and Docker Compose
runtime state are needed:

```bash
pnpm run mill -- report --deep --json
```

Read `summary` first, then `recommendations`, and inspect only the relevant `capabilities`,
`infrastructure`, or `services` entry. Do not infer readiness from `miller.config.json` alone:
an enabled capability can still be missing application configuration or provider state.

## Structure

- `apps/backend`: NestJS 11, TypeORM, PostgreSQL, Better Auth, Stripe, BullMQ.
- `apps/frontend`: Next.js 16, React 19, Tailwind CSS 4, React Query.
- `apps/backend-e2e`: API end-to-end tests.
- `libs/project-setup`: the `mill` CLI and its tests.
- `skills/use-miller`: distributable coding-agent skill.
- `miller.config.json`: machine-readable project and capability manifest.

## Commands

```bash
pnpm run build
pnpm --dir apps/frontend run build
pnpm run test
pnpm run lint
pnpm run knip
pnpm run mill -- verify --scope backend
pnpm run mill -- verify --scope frontend
```

Lint commands must not silently become the only verification step. Use `lint:fix` for
mutating lint operations when available.

## Provider setup

Use `mill setup` for Better Auth and Stripe. Do not recreate its setup logic or edit
generated environment files with broad replacements. The command updates only managed keys,
preserves unrelated values and comments, writes atomically, and returns paths and key names
without returning secret values.

For a fresh project whose credentials are already present in the process environment:

```bash
pnpm run mill -- setup --from-env --dry-run --json
pnpm run mill -- setup --from-env --apply --yes --json
pnpm run mill -- report --deep --json
pnpm run mill -- doctor --deep --json
```

The first command is the required planning step. Auth setup generates and preserves a local
Better Auth secret without external infrastructure. Billing setup runs Terraform and mutates
Stripe resources, so apply billing only when the user requested or approved it. `--yes`
confirms non-interactive execution; it is not permission to expand the selected capabilities.

Use `--only auth` or `--only billing` to minimize scope. With `--from-env`, Miller reads the
`MILLER_GOOGLE_*`, `MILLER_AUTH_*`, or `MILLER_STRIPE_*` variables documented in
`libs/project-setup/README.md`; never pass secrets as command arguments or echo them. When
ignored `terraform.tfvars` files have already been prepared, omit `--from-env`.

To reconcile local application configuration from existing Terraform state without changing
provider resources, run:

```bash
pnpm run mill -- env sync --dry-run --json
pnpm run mill -- env sync --json
```

Auth setup populates the backend, frontend, and backend E2E environments. Billing outputs
populate backend Stripe credentials and `STRIPE_PRODUCT_CATALOG_JSON`; price IDs must not be
copied into public frontend variables. Treat missing Terraform outputs as a reason to plan or
apply setup, not as permission to invent provider values.

Interpret setup JSON through `ok`, `changed`, `applied`, `changes`, and `steps`. Report paths,
keys, statuses, and remediation only. Never print `.env`, `terraform.tfvars`, Terraform state,
or sensitive output contents. New generated projects use local Terraform state until the user
deliberately configures a remote backend.

## Architecture rules

- Keep domain logic out of controllers and React components.
- Authorize in the backend even when the frontend hides an action.
- Validate external input at its boundary.
- Keep generated OpenAPI types generated; change the backend contract first.
- Put provider SDKs behind application-owned interfaces.
- Never let model-generated AI tool arguments bypass parsing or authorization.
- Add migrations for persistent schema changes; never enable schema synchronization.
- Keep local backend imports ESM-compatible with `.js` extensions.
- Do not commit secrets, `.env` files, Terraform state, tokens, or generated build output.
- Do not run `mill setup --apply --yes` merely to diagnose configuration; use a dry run and
  `doctor --deep --json` first.

## Style

- TypeScript strict mode, four spaces, semicolons, double quotes.
- `PascalCase` for types/classes/components; `camelCase` for functions and variables.
- Boolean names begin with `is`, `should`, `has`, `can`, `did`, or `will`.
- Use NestJS exceptions for HTTP-facing failures and a service-local `Logger` where logs
  add operational value.
- Use `*.test.ts` for unit tests and `*.e2e-spec.ts` for API end-to-end tests.

## Completion contract

Before declaring a change complete, run the narrowest relevant tests plus builds for all
affected applications. Report commands that could not run and why. Preserve unrelated
working-tree changes.
