# Miller coding instructions

Follow `/AGENTS.md`. Before broad changes, inspect `/miller.config.json`, `/PRODUCT.md`,
and `/ARCHITECTURE.md`. Prefer `pnpm run mill -- <command> --json` when a matching Miller
operation exists, preserve unrelated changes, and verify every affected application.
Use `mill report --json` as the redacted capability, infrastructure, and service inventory;
use `mill report --deep --json` only when Terraform and Docker runtime state are relevant.

For Auth0 or Stripe configuration, follow the provider setup contract in `/AGENTS.md`: plan
with `mill setup --from-env --dry-run --json`, scope with `--only`, and never expose secret
inputs or Terraform outputs. Provider apply is an external mutation and requires explicit
user intent.
