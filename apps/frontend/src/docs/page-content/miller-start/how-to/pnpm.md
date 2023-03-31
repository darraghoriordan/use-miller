---
title: "pnpm Package Manager"
date: "2020-01-01"
order: 50
---

If you're new to pnpm then you should read the [pnpm documentation](https://pnpm.js.org/en/).

Day to day usage is similar to npm or yarn. The main difference is that pnpm uses a single `node_modules` folder for all packages.

## Consider adding aliases

I recommend adding aliases to your shell to make it easier to run pnpm commands. If you use Miller DevShell you should have these already.

```bash
alias pnpm="pnpm"
alias pnr="pnpm run"
alias pui="pnpm update --recursive --interactive"
```

## Common commands

```bash
# install dependencies
pnpm install -r

# update dependencies (I personally use `pui` above instead)
pnpm update -r

# run a script (I use `pnr <script>` instead)
pnpm run <script>

# run a script in a specific package
pnpm run <script> --filter='backend'
```
