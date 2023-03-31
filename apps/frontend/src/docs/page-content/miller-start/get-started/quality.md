---
title: "Code Quality Tools"
date: "2020-01-01"
order: 0
---

I personally like having tools help me write consistent, correct code. Miller uses a lot of tools to help with this.

If you're not used to them, you will likely find it frustrating. I recommend you keep it all turned on and learn how to use it. It will save you time in the long run.

But if you want to turn anything off, here's how to do it.

## Conventional commits and commitlint

If you use conventional commits, git can version your code automatically and produce release notes for you.

A conventional commit looks like `feat: add a new feature` or `fix: fix a bug`.

I enforce this with commitlint, which will stop you from committing if you don't use a conventional commit.

Turn off commit message linting by deleting `.husky/commit-msg`.

## Linting

I use eslint to catch static errors. You'll see that there are a lot of rules turned on for every project.

You can turn off automatic linting by deleting `.husky/pre-commit`.

## Prettier

I use prettier to format my code. I mostly use the default settings. I have a few custom settings in `.editorconfig`.

I set VSCode to auto format on save, so I don't have to think about it.

You can change prettier to do anything you like and run it with fix to apply the changes.
