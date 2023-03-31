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

## Initialising your new project

Copy the files from the repository into your own local repository.

Run `pnpm run mill:init` in the root and follow the instructions.

## Running locally

Run `pnpm run mill:dev` to start the local infra, frontend and backend.

## Failures?

The init scripts interface with your file system, git, auth0 and stripe. It's somewhat complex and it's possible that something will go wrong. If you get stuck, please read the full installation instructions for more detailed instructions.

Also use the support channels if there's something that isn't covered in the docs. It helps me to make this better for everyone.
