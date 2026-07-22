# Miller agent guide

Miller is an agent-ready production application starter. Read `PRODUCT.md`,
`ARCHITECTURE.md`, `DESIGN.md`, and `miller.config.json` before making broad changes.

## Start here

Run these read-only commands before changing the project:

```bash
pnpm run mill -- describe --json
pnpm run mill -- doctor --json
git status --short
```

Prefer `mill` commands when a matching capability exists. They are the stable interface
for project configuration and must remain non-interactive, idempotent, dry-run capable,
and machine-readable. Do not implement broad text replacement in the CLI.

## Structure

- `apps/backend`: NestJS 11, TypeORM, PostgreSQL, Auth0, Stripe, BullMQ.
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
