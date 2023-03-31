---
title: "Database"
date: "2020-01-01"
order: 50
---

Miller Start is tested with a Postgres database for data storage.

It uses typeorm which supports many other datastores so you should be able to change to another RDBMS if you like.

## Database migrations

Miller Start uses typeorm migrations to manage database schema changes. This is a good way to manage database changes in a consistent way.

The steps for modifying the db schema are:

1. Create a new entity. It must have the `.entity.ts` suffix.
1. Build the app - `pnpm run build`.
1. Generate a migration - `pnpm run db:gen migrations/my-migration-name`.
1. Review the migration does what you expect.
1. Start the backend - the migration will be run automatically.

## Non-destructive migrations

You must ensure your migrations are non-destructive. Postgres allows column renaming but most databases do not. This means if you change the name of a column, type orm will delete the existing data and add a new empty column.

This is not acceptable for production data.

It's up to you to ensure you understand what a migration is doing and that it is non-destructive.

A better approach is to only ever perform additive changes. Instead of modifying an existing column. Treat it as idempotent and add a new column.

Then you can migrate the data from the old column to the new column. Then you can remove the old column later.

## Reverting migrations

TypeORM generates both an "up" and "down" migration to support reverting changes. This is useful for development but not for production.

To revert a migration on production, you must add a new migration that reverts the changes. Then run the new migration. Typeorm "Reverting" a migration will not work as expected for checked in code.

If you apply a migration locally and want to revert it, you CAN use `pnpm db:revert <migration-name>`. But only locally! This will not work on production.
