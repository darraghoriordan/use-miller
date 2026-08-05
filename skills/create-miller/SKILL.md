---
name: create-miller
description: Create a new application from the Miller starter and guide its owner through naming, local setup, provider credentials, verification, and optional production setup. Use when a user asks to start, scaffold, bootstrap, or create a Miller application before a miller.config.json project exists.
---

# Create Miller

Follow the canonical creation workflow at
[`https://usemiller.dev/start.md`](https://usemiller.dev/start.md).

If network access is unavailable, use the same workflow below.

## Intake

Ask for the application name if it is missing. A one-sentence product description is useful
but optional. Derive a lowercase kebab-case slug and use it as the directory name. Do not ask
the user to choose values that can safely be derived. Show the name, slug, and absolute target
directory before creating files, and do not overwrite an existing path.

## Create

Check for Node.js 24, pnpm 11, Docker, and Git. Then run the installer with concrete values:

```bash
pnpm create miller@latest <slug> --name "<application name>" --slug <slug> --yes --json
```

Work from the generated directory. Read `AGENTS.md`, `PRODUCT.md`, `ARCHITECTURE.md`,
`DESIGN.md`, `miller.config.json`, and `skills/use-miller/SKILL.md`. The generated repository's
instructions and source now take precedence over this bootstrap skill.

## Guide

Run the generated project's initial inspection commands and translate their JSON results into
plain-language next steps. Configure local development first. Tell the user the exact ignored
file, destination keys, provider source URL, and callback or webhook URL for missing
credentials. Never ask them to paste a secret into chat and never print sensitive files.

Use dry runs before mutations. Stop for explicit approval before provisioning external
resources, applying production Terraform, deploying, or making changes that may incur charges.
After each manual or automated setup step, rerun Miller's report rather than assuming success.
