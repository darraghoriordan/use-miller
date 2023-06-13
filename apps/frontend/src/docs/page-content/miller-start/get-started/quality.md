---
title: "Code Quality Tools"
date: "2020-01-01"
order: 30
---

I use tools help me write consistent, correct code. Miller includes pre-configured tools to help with this.

If you're not used to strict tools, you might find it frustrating.

I recommend you keep it all turned on, It will save you time in the long run. But if you want to turn anything off, here's how to do it.

## Lint Staged

I use lint-staged and husky to run linting and formatting on any changes when you're creating a commit.

Lint-staged is configured to run commitlint to enforce a strict commit message format.

## Conventional commits and commitlint

If you try to commit you may get an error. This is because I use commitlint to enforce a strict commit message format.

A conventional commit looks like `feat: add a new feature` or `fix: fix a bug`.

Turn off commit message linting by deleting `.husky/commit-msg`.

Read more: https://www.conventionalcommits.org/en/v1.0.0/#summary

## Linting

I use eslint to catch static errors. You'll see that there are a lot of rules turned on for every project.

You can turn off automatic linting by deleting `.husky/pre-commit`.

## Prettier

I use prettier to format my code. I mostly use the default settings. I have a few custom settings in `.editorconfig`.

I set VSCode to auto format on save, so I don't have to think about it.

You can change prettier to do anything you like and run it with fix to apply the changes.
