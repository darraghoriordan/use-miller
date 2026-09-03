---
title: "Installation"
date: "2026-08-02"
order: 20
---

## Requirements

- Node.js 24
- pnpm 11
- Docker Desktop or Docker Engine with Compose
- Terraform only when provisioning Stripe or the example production infrastructure

Use the pinned versions in `.nvmrc` and `package.json`:

```bash
nvm install
corepack enable
pnpm install
```

## Create an application

Create a new project with the published installer:

```bash
pnpm create miller@latest my-app
cd my-app
pnpm install
```

From a Miller source checkout, create a sibling application with:

```bash
pnpm run mill -- create ../my-app --name "My App" --slug my-app
```

## Inspect before setup

The CLI is non-interactive and returns machine-readable output for both humans and agents:

```bash
pnpm run mill -- describe --json
pnpm run mill -- report --profile all --json
pnpm run mill -- doctor --json
```

## Configure authentication

Authentication is self-hosted by the NestJS backend. No Auth0 tenant or other identity SaaS
account is required. Plan and apply the local configuration:

```bash
pnpm run mill -- setup --only auth --dry-run --json
pnpm run mill -- setup --only auth --apply --yes --json
```

The first apply generates a strong `BETTER_AUTH_SECRET`; later runs preserve it. Google is
the only sign-in method. Put your own Google account email and OAuth credentials in the
ignored backend environment to bootstrap the first operator:

```
SUPER_USER_EMAILS=you@example.com
GOOGLE_CLIENT_ID=your-local-client-id
GOOGLE_CLIENT_SECRET=your-local-client-secret
```

Then run `pnpm run mill -- setup --profile local --only auth --apply --yes --json` to
validate and synchronize the auth environment.

Register `http://localhost:34522/api/auth/callback/google` as the local OAuth callback.
On the first sign-in, a verified Google email claims the existing application user with the
same email, preserving its memberships and data. Then open `/super-admin` to manage identities,
roles, suspensions, sessions, application users, subscriptions, and payment events.

## Configure Stripe

Billing setup creates Stripe resources with Terraform. Supply credentials through the
process environment, inspect the plan, and apply only after reviewing it:

```bash
MILLER_STRIPE_ACCESS_TOKEN=... \
MILLER_STRIPE_WEBHOOK_VERIFICATION_KEY=... \
pnpm run mill -- setup --only billing --from-env --dry-run --json

MILLER_STRIPE_ACCESS_TOKEN=... \
MILLER_STRIPE_WEBHOOK_VERIFICATION_KEY=... \
pnpm run mill -- setup --only billing --from-env --apply --yes --json
```

The CLI writes only managed keys, preserves other environment values, and never returns
secrets in its JSON output.

## Start and verify

```bash
pnpm run mill:dev
pnpm run mill -- report --deep --json
pnpm run mill -- doctor --deep
```

`mill:dev` waits for Docker, builds the backend, runs pending migrations, and then starts
both applications. It is safe to rerun after pulling schema changes.

Use the report's `recommendations` as the next-action queue. A report with `ok: true` was
generated successfully; actual readiness is in `summary.status`.
