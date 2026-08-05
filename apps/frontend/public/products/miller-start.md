# Miller Start

Miller Start is an agent-ready application starter for solo developers building real web
products. It combines an ordinary, inspectable TypeScript codebase with a deterministic CLI
that coding agents and humans can operate together.

## What it includes

- NestJS 11 API and Next.js 16 frontend in a pnpm workspace
- PostgreSQL persistence and TypeORM migrations
- Self-hosted Better Auth with email/password, optional Google login, bearer tokens, and
  administration features
- Organization membership and application authorization patterns
- Stripe checkout, subscriptions, customer portal, webhooks, and a server-owned product
  catalog
- Redis and BullMQ background jobs
- Email infrastructure with intentionally disabled delivery for local development
- OpenTelemetry, Jaeger, and Prometheus observability
- Docker images and Terraform examples for local and Dokku production infrastructure
- OpenAPI-generated clients and end-to-end tests
- An optional provider-neutral foundation for application AI tools

## The agent workflow

Miller's `mill` CLI reports what is configured locally and in production without exposing
secret values. Its commands are non-interactive, JSON-capable, idempotent, and dry-run capable.
The generated repository includes durable agent guidance for implementation, configuration,
verification, database migrations, and production operations.

To have a coding agent create and configure an application, tell it:

```text
Follow https://usemiller.dev/start.md and create my app.
```

For direct terminal use:

```bash
pnpm create miller@latest my-app
```

## Best suited to

Miller Start is designed for solo developers and small teams who want production concerns
handled early without adopting microservices, Kubernetes, or a proprietary application
runtime. Generated code belongs to the application and can be changed normally.

## Links

- Product: https://usemiller.dev/miller-start
- Creation guide: https://usemiller.dev/start.md
- Source: https://github.com/darraghoriordan/use-miller
- Repository guide: https://github.com/darraghoriordan/use-miller#readme
