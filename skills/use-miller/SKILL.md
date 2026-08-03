---
name: use-miller
description: Build, configure, provision, diagnose, verify, deploy, or extend an application created from the Miller starter. Use for projects containing miller.config.json, especially when creating an app, setting up production, configuring self-hosted Better Auth or Stripe, integrating either Next.js or an independent browser SPA, adding billing product catalogs, enabling email, jobs, observability or AI, changing backend/frontend features, or operating the non-interactive mill CLI.
---

# Use Miller

Treat `miller.config.json` as project metadata and application source as truth.

## Inspect

Before broad changes, run:

```bash
pnpm run mill -- describe --json
pnpm run mill -- report --profile all --json
pnpm run mill -- doctor --json
git status --short
```

Read `PRODUCT.md` and `ARCHITECTURE.md`. Read `DESIGN.md` for UI work. Preserve unrelated
working-tree changes. Follow `AGENTS.md` as the canonical repository contract.

Treat `mill report --profile all --json` as the primary inventory. Inspect each profile's
summary, recommendations, and credentials before individual capabilities or services. Use
`--deep` when Terraform output availability or Docker Compose runtime state matters. A
successful report means inspection succeeded; readiness comes from `summary.status`, not
`ok` alone.

## Change

Use a matching `mill` command before manually scaffolding a capability. Run mutations with
`--dry-run --json` first. Commands must remain non-interactive and idempotent.

For application code:

- Keep authorization and domain rules in the backend.
- Change OpenAPI contracts before generated clients.
- Keep provider SDKs behind application interfaces.
- Require AI tools to parse and authorize their arguments before execution.
- Add focused tests with every capability.

Do not put secrets in prompts, command arguments, project metadata, or committed files.

## Configure providers

Keep setup agent-safe and non-interactive. Read `libs/project-setup/README.md` when provider
inputs or mappings are relevant. For local human setup, tell the user to edit the ignored
destination and `destinationKeys` reported by Miller—normally `apps/backend/.env`. For
production, use the reported ignored `terraform.tfvars`. Never ask the user to paste secret
values into chat. `MILLER_*` process inputs are an automation/CI alternative, not the
default human workflow. Plan first and apply only when the user has approved external
provider mutations:

```bash
pnpm run mill -- setup --from-env --dry-run --json
pnpm run mill -- setup --from-env --apply --yes --json
pnpm run mill -- production --from-env --dry-run --json
pnpm run mill -- report --profile all --deep --json
pnpm run mill -- doctor --deep --json
```

Use `--profile local` for ignored `.env` files and local provider variables. Use
`--profile production` for ignored provider and Dokku `terraform.tfvars`. Use `--only auth`
or `--only billing` for a narrow operation. Use `mill env sync --profile production --json` when
Terraform already exists and only production application variables need reconciliation.
Treat the returned paths, changed keys, and steps as the operation result; never inspect or
print secret file values. Never expose `.env`, `terraform.tfvars`, state, or sensitive outputs.
Do not invent missing provider values. Billing synchronization owns the backend
`STRIPE_PRODUCT_CATALOG_JSON`; do not restore public frontend price IDs.
Treat disabled local email delivery as intentional development mode. Do not configure a real
SMTP provider locally unless the user explicitly asks for it.

## Set up production

Use the complete production command instead of manually setting Dokku variables:

```bash
pnpm run mill -- production --from-env --dry-run --json
pnpm run mill -- production --from-env --apply --yes --json
pnpm run mill -- report --profile production --deep --json
```

The first command is mandatory planning and does not mutate files or providers. Ask for
approval before the second command because it applies provider and Dokku Terraform. The apply
generates or preserves Better Auth configuration, provisions Stripe, synchronizes the ignored
Dokku `terraform.tfvars`, applies the production environment and linked services, and returns
a fresh production report. If the command reports missing credentials, tell the user where to
obtain them and which ignored destination keys to fill; never request secret values in chat.
Do not report production ready unless the returned production report is ready.

Auth is hosted by the NestJS backend. Run `mill setup --only auth --apply --yes` to generate
and preserve its signing secret; it does not call Terraform or an external identity service.
Use cookie sessions for same-site web flows. For an independent SPA, mobile client, SSE, or
other non-cookie transport, use Better Auth's signed bearer token and keep the same backend
authorization guard. Never add Next.js-specific behavior to the shared backend auth module.

Better Auth's Admin plugin is mounted through NestJS at `/api/auth/admin/*`. For the first
owner, tell the user to put `SUPER_USER_EMAILS` in `apps/backend/.env` locally or
`app_super_user_emails` in the production Dokku `terraform.tfvars`; `mill report` exposes
this as the optional `owner-admin` credential. Matching users are idempotently assigned the
Better Auth `admin` role at creation and startup, and that role maps to Miller's global Nest
permissions. Use the protected `/super-admin` UI or Admin API for later user roles, bans,
and session revocation. Do not trust frontend route visibility as authorization.

Google sign-in is optional. Locally, ask the user to set `GOOGLE_CLIENT_ID` and
`GOOGLE_CLIENT_SECRET` in `apps/backend/.env`, then run the auth setup command to reconcile
the frontend feature flag. The callback is
`<MILLER_BACKEND_BASE_URL>/api/auth/callback/google`. Email/password remains available when
no social provider is configured. Use the report's `credentials` entries as source of truth
for official provider URLs, destination keys, automation inputs, and callback/webhook
URLs. Never ask the user to paste a secret into chat when they can export it in their shell.
The frontend publishes only its API base URL and Google-enabled boolean through
`/api/runtime-config` before client initialization. Keep these settings runtime-driven for
Docker deployments; do not add secrets to this endpoint or replace it with Docker build args.

For local development, prefer `pnpm run mill:dev`: it waits for Docker services and applies
compiled database migrations before starting the frontend and backend. This includes Better
Auth plugin schema changes and remains safe to rerun.

## Verify

Run the narrowest relevant command:

```bash
pnpm run mill -- verify --scope backend
pnpm run mill -- verify --scope frontend
pnpm run mill -- verify --scope setup
```

Then run affected tests. Report any verification that could not complete and the concrete
reason.
