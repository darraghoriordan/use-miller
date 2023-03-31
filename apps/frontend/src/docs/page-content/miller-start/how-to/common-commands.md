---
title: "Common Commands"
date: "2020-01-01"
order: 10
---

Here are some common commands when building with Miller Start.

You can run the backend and frontend apps separately, or together. I tend to run them in separate shell instances.

## Running everything together

```bash
## in the root directory
pnpm run mill:dev
```

## Running the backend app only

```bash
## change to the be directory
cd apps/backend

# run the docker infrastructure
pnpm run up

# (optional) build
pnpm run build

# start dev
pnpm run start
```

## Running the frontend app only

```bash
## change to the be directory
cd apps/frontend

# (optional) build
pnpm run build

# start dev
pnpm run start
```

## Building a new api client from OpenAPI Specification

Miller uses a generated client to communicate with the backend. This ensures consistency between apps and backend.

If you change the backend api you should regenerate the client.

The specification is updated on every backend startup (on dev only) and committed to the repository. The generated client is also committed to the repository. This makes it easier to ship Miller Start as one package but you can consider moving your client to a separate package if you want to.

```bash
## change to the be directory
cd apps/backend

# run the script to generate the client
pnpm run client:generate
```

## Backend unit tests

For small teams and solo developers there is much more value in full integration tests. So Miller Start doesn't have high unit test coverage. But if you want to add them, everything is set up for you.

Any file with the suffix `.spec.ts` or `.test.ts` will be run as a unit test. You should place tests next to the file they are testing. The build step uses a tsconfig file that excludes the test files from the build.

```bash
# unit tests
pnpm run test
```

## Backend integration tests

Miller has a full suite of integration tests. These require a running backend, database and redis instance.

The integration tests will call auth0 and the backend so you cannot run all tests at once in parallel because you will get rate limited. It's unlikely that you will need to run all tests at once. If your team is large enough to require this then you should consider paid auth0 plans and splitting the backend up!

```bash
# have the full BE running

# change to integration test app
cd apps/backend-e2e

# run an integration test
pnpm run test:e <match name of test file>

# e.g. pnpm run test:e new-user
```

## Migrations

Migrations are detected in built code ONLY.

You must build the project before running migrations.

Migrations must be placed in the `migrations` folder. In the latest version of typeorm we can't use the `migrationsDir` option so we must specify the full relative path manually - `migrations/migrationName`.

```bash
# generate new
$ pnpm run db:gen migrations/initWoohoo

# run the migrations (or just build and start the BE)
$ pnpm run db:run
```

## Deploying manually

```bash
# add dokku remote (only need to run this once)
git remote add dokku dokku@YOURdokkuSERVER:use-miller
```

```bash
# push to dokku
git push dokku main:master
```
