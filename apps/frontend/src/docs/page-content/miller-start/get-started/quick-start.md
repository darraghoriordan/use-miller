---
title: "Quick Start"
date: "2020-01-01"
order: 1
---

This is the quick start. See the full installation instructions for more detail on the steps below.

## Minimum requirements

```
node >=18
pnpm >=7.0.0
docker desktop @ latest
terraform >=0.14.0
```

Install node from https://nodejs.org/en or with nvm.

Install pnpm with npm `npm install -g pnpm`

Install docker desktop from https://www.docker.com/products/docker-desktop

Install terraform from https://www.terraform.io/downloads.html

## Initialising your new project

Copy the files from the repository into your own local repository.

Run `pnpm run mill:init` in the root and follow the instructions.

## Project name and these docs

After running `mill:init` the projects should be renamed to match your project name. This means anywhere I use `use-miller` in the docs should be replaced with your project name.

e.g. `git remote add dokku dokku@YOURdokkuSERVER:use-miller` would be `git remote add dokku dokku@YOURdokkuSERVER:<YOUR_PROJECT_NAME>`

## Running locally

Run `pnpm run mill:dev` to start the local infra, frontend and backend.

## Surprising commit strictness

I use husky, lint-staged and commitlint to enforce code consistency and commit message standards.

If you try to commit and get a formatting error, try using a conventional commit message prefix like `fix:` or `feat: `.

e.g. `fix: fix a bug` or `feat: add a new feature`

See the docs on Code Quality Tools for instructions on how to turn all of this off.

## Failures?

The init scripts interface with your file system, git, auth0 and stripe. It's somewhat complex and it's possible that something will go wrong. If you get stuck, please read the full installation instructions for more detailed instructions.

Also use the support channels if there's something that isn't covered in the docs. It helps me to make this better for everyone.
