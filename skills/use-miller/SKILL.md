---
name: use-miller
description: Build, configure, diagnose, verify, or extend an application created from the Miller starter. Use for Miller projects containing miller.config.json, especially when adding auth, billing, email, jobs, observability, AI, backend resources, or frontend features through the mill CLI.
---

# Use Miller

Treat `miller.config.json` as project metadata and application source as truth.

## Inspect

Before broad changes, run:

```bash
pnpm run mill -- describe --json
pnpm run mill -- doctor --json
git status --short
```

Read `PRODUCT.md` and `ARCHITECTURE.md`. Read `DESIGN.md` for UI work. Preserve unrelated
working-tree changes.

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

## Verify

Run the narrowest relevant command:

```bash
pnpm run mill -- verify --scope backend
pnpm run mill -- verify --scope frontend
pnpm run mill -- verify --scope setup
```

Then run affected tests. Report any verification that could not complete and the concrete
reason.
