# Architecture

The browser talks to a Next.js 16 frontend. Server-side frontend code and generated API
clients call the NestJS API. NestJS owns authorization, domain rules, persistence,
integrations, jobs, and audit-worthy actions. PostgreSQL is the system of record; Redis is
used for cache and BullMQ jobs, not durable business truth.

## Boundaries

- `apps/frontend` owns presentation, navigation, interaction state, and server rendering.
- `apps/backend` owns domain behaviour and all security decisions.
- OpenAPI is the contract between frontend and backend.
- Provider SDKs are adapters behind application-owned interfaces.
- `libs/project-setup` may edit project structure but is not imported by either runtime.
- `miller.config.json` describes project state; it must not contain secrets.

## Optional AI capability

`ai-core` separates model invocation from application tools. Model providers implement
`AiModelClient`. Each tool supplies a declaration, parser, authorization check, and
executor. Conversation storage, streaming transport, model selection, prompts, quotas,
cost accounting, and provider adapters belong in separate modules built on this core.

## Dependency policy

Pin the package manager and application dependencies. Upgrade framework majors in isolated
changes with migration guides and regression tests. Renovate may automate compatible
updates, but a passing lockfile update is not evidence that a framework migration works.
