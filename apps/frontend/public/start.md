# Create a Miller application

Use this guide to create a new application from the Miller starter and walk its owner through
local development and production setup.

## How to work

- Guide the user in plain language. Do not expect them to know the Miller CLI.
- Ask only for information that is missing or currently blocking progress.
- Use non-interactive, machine-readable Miller commands and summarize their results.
- Run a dry run before every Miller mutation.
- Never ask the user to paste secrets into the conversation.
- Never print `.env`, `terraform.tfvars`, Terraform state, tokens, or sensitive outputs.
- Stop for explicit approval before provisioning external resources, applying production
  Terraform, deploying, or making a change that may incur a charge.
- Keep every operation rerunnable. After the user completes a manual step, inspect again
  instead of assuming it worked.

## 1. Name the application

If the user has not supplied an application name, ask for it. A one-sentence description of
the product is helpful but optional.

Derive the project slug from the name:

- lowercase the name;
- transliterate or remove characters that cannot appear in a package name;
- replace runs of spaces and punctuation with one hyphen;
- remove leading and trailing hyphens.

Use the slug as the default directory name. Do not make the user choose a slug or directory
unless the derived value conflicts with an existing path or they ask for a different location.
Before creating files, show the name, slug, and absolute target directory and ask the user to
confirm them.

## 2. Check prerequisites

Check for Node.js 24, pnpm 11, Docker, and Git. Explain any missing prerequisite and help the
user install it before continuing. Do not alter an existing project directory.

## 3. Create the project

Run the following with concrete values, not shell placeholders:

```bash
pnpm create miller@latest <slug> --name "<application name>" --slug <slug> --yes --json
```

The installer creates the directory, installs dependencies, and performs its initial checks.
If the user deliberately wants to defer dependency installation, add `--no-install` and run
`pnpm install` inside the generated project later.

## 4. Hand over to the generated project

Work from the generated directory. Read these files before changing the application:

```text
AGENTS.md
PRODUCT.md
ARCHITECTURE.md
DESIGN.md
miller.config.json
skills/use-miller/SKILL.md
```

Then inspect the project:

```bash
pnpm run mill -- describe --json
pnpm run mill -- report --profile all --json
pnpm run mill -- doctor --json
git status --short
```

Summarize what is enabled, ready, optional, and missing. Use the report's `credentials`
entries to tell the user where credentials come from, which ignored file to edit, the exact
destination key names, and any callback or webhook URL to register. Do not request credential
values in chat.

## 5. Get local development working

Plan only the capability that needs attention. For example:

```bash
pnpm run mill -- setup --profile local --only auth --dry-run --json
pnpm run mill -- setup --profile local --only billing --dry-run --json
```

After the user has filled any reported ignored files, and after showing the planned change,
apply the relevant setup:

```bash
pnpm run mill -- setup --profile local --only auth --apply --yes --json
pnpm run mill -- setup --profile local --only billing --apply --yes --json
```

Only configure capabilities the user wants. Better Auth works locally without an external
identity provider; Google login and Stripe require their respective provider credentials.
Start and verify the application:

```bash
pnpm run mill:dev
pnpm run mill -- report --profile local --deep --json
```

Explain the frontend and backend URLs and walk the user through the important first-use flow.

## 6. Offer production setup

Do not begin production setup until local development works and the user wants to continue.
Plan production first:

```bash
pnpm run mill -- production --dry-run --json
```

Walk through every reported credential or configuration gap. Ask the user to edit the exact
ignored `terraform.tfvars` destination reported by Miller. Once the report is complete and
the user explicitly approves applying external changes, run:

```bash
pnpm run mill -- production --apply --yes --json
pnpm run mill -- report --profile production --deep --json
pnpm run mill -- doctor --deep --json
```

Do not claim production is ready unless the final production report says it is ready.
