# Miller project setup

`mill` is Miller's deterministic setup and maintenance interface. It is deliberately a
normal CLI rather than a wizard or full-screen TUI: humans, coding agents, and CI run the
same commands and receive the same result.

Setup is non-interactive, idempotent, JSON-capable, and secret-safe. `mill` generates and
preserves Better Auth configuration. Terraform owns Stripe resources and `mill` maps their
outputs into local environment files or production Terraform variables with atomic,
key-level updates.

```bash
# Inspect what is enabled and diagnose local prerequisites.
pnpm run mill -- describe --json
pnpm run mill -- report --profile all --json
pnpm run mill -- doctor --deep --json

# Plan setup using credentials supplied by the calling process.
pnpm run mill -- setup --from-env --dry-run --json

# Apply selected setup and synchronize application environment files.
pnpm run mill -- setup --from-env --apply --yes --json

# Configure production: inputs come from the process, secrets land in ignored tfvars.
pnpm run mill -- setup --profile production --from-env --dry-run --json
pnpm run mill -- setup --profile production --from-env --apply --yes --json

# Rebuild environment files from existing Terraform outputs without applying infrastructure.
pnpm run mill -- env sync --json
```

Use `--only auth` or `--only billing` to limit the operation. The `local` profile writes
application `.env` files and local provider `terraform.tfvars`. The `production` profile
writes provider inputs to `infrastructure/production/stripe-prod/terraform.tfvars` and
runtime configuration to `infrastructure/production/dokku-app/terraform.tfvars`. Both files
are ignored. JSON output reports only paths and changed keys; it never includes values.

## Project report

`mill report --profile all --json` is the read-only control-plane view for coding agents. It
returns separate `local` and `production` reports containing capability readiness,
Terraform configuration, credential acquisition instructions, exact destinations, and
actionable remediation. It returns `ok: true` when inspection succeeded; use
`summary.status` to decide whether the project is ready or needs attention.

```bash
# Deterministic local configuration inventory; does not invoke Terraform or Docker.
pnpm run mill -- report --profile all --json

# Inspect just one target.
pnpm run mill -- report --profile local --json
pnpm run mill -- report --profile production --json

# Also inspect Terraform output availability and Docker Compose runtime state.
pnpm run mill -- report --deep --json
```

The stable top-level fields are:

- `summary`: counts and overall `ready` or `attention` state.
- `capabilities`: enabled state, configuration completeness, related services, and provider
  infrastructure for Stripe.
- `infrastructure`: Terraform path, variable-file presence, initialization, and output
  availability.
- `services`: configured and runtime state for PostgreSQL, Redis, Jaeger, the OpenTelemetry
  collector, and Prometheus.
- `recommendations`: scoped next actions with `none`, `local`, or `external` mutation scope.
- `credentials`: whether each required or optional credential is configured, its ignored
  destination and keys, optional automation input names, its official source URL, and any
  callback or webhook URL to register.

Only key names, relative paths, statuses, and commands are reported. Environment values,
Terraform variables, state, and outputs are never included. `miller.config.json` owns the
service inventory, so adding or removing supported services changes the report declaratively.
Disabled local SMTP is an intentional development mode and does not make the local profile
unready; production email configuration is still enforced when the capability is enabled.

## Credential input contract

For interactive local development, put credentials directly in the ignored destination
reported by Miller. For Google, set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in
`apps/backend/.env`, then run `mill setup --profile local --only auth --apply --yes` to
synchronize the frontend feature flag. Set `SUPER_USER_EMAILS` there to a comma-separated
list of application owners; after their first sign-in they receive Better Auth admin access
and Miller's global backend permissions. For production, use `app_super_user_emails` in the
reported ignored Dokku `terraform.tfvars`. For production generally, edit the reported ignored
`terraform.tfvars` destination. The `MILLER_*` variables below are optional inputs for CI,
scripts, and other automation.

Auth setup generates `BETTER_AUTH_SECRET` on first local apply and
`app_better_auth_secret` on first production apply, then preserves it on reruns. Inputs are:

- `MILLER_FRONTEND_BASE_URL` and `MILLER_BACKEND_BASE_URL`
- `MILLER_GOOGLE_CLIENT_ID` and `MILLER_GOOGLE_CLIENT_SECRET`
- `MILLER_SUPER_USER_EMAILS`
- `MILLER_REQUIRE_EMAIL_VERIFICATION`
- `MILLER_AUTH_TEST_ACCOUNT_*` to override local E2E credentials

Miller reports this optional owner bootstrap as the `owner-admin` credential. It never
defaults the application owner to an E2E account. Startup reconciliation makes the setting
rerunnable, while subsequent administration should use the authenticated Better Auth Admin
API rather than editing environment variables for every operator.

Production auth requires `MILLER_FRONTEND_BASE_URL` and `MILLER_BACKEND_BASE_URL`. Google
sign-in remains optional. Create a Web application in the
[Google Auth Platform](https://console.cloud.google.com/auth/clients), then register the
`relatedUrl` reported for `google-oauth` as its authorized redirect URI.

Billing setup reads:

- `MILLER_STRIPE_ACCESS_TOKEN`
- `MILLER_STRIPE_WEBHOOK_VERIFICATION_KEY`
- optional `MILLER_FRONTEND_BASE_URL` and `MILLER_BACKEND_BASE_URL`
- optional `MILLER_GITHUB_ACCESS_TOKEN`

Get the test or live server secret from the [Stripe API keys dashboard](https://dashboard.stripe.com/apikeys).
Local setup also accepts the signing secret for an existing test endpoint through
`MILLER_STRIPE_WEBHOOK_VERIFICATION_KEY`; production Terraform creates the endpoint and
copies its generated secret into the Dokku variables file.

Alternatively copy the applicable `terraform.tfvars.template` to the ignored
`terraform.tfvars` beside it and omit `--from-env`. Never put credentials in command
arguments, prompts, or `miller.config.json`.
