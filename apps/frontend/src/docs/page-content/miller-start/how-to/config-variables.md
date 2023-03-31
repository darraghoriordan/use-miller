---
title: "Config Variables"
date: "2020-01-01"
order: 50
---

Miller Start uses environment variables to configure the apps. This makes it easy to deploy to different environments and to run locally.

## Configuring the frontend

Most of these are self explanatory. The names I use for stripe prices are generic on purpose for Miller Start. You would probably use different names for your own app.

## Configuring the backend

NestJs modules usually use a method for configuration e.g. `ConfigModule.forRoot({variable, variable})`. Miller Start already configures most of these settings for the context of Miller Start. Any remaining variables are exposed as environment variables.

Most of the names should be self explanatory. I'll comment on some of the more unusual ones here!

### APP_POSTGRES\*\*\*\* variables

These are used to configure the connection to the Postgres database LOCALLY. Dokku sets a variable called `DATABASE_URL` which is used to configure the connection to the database in production.

### AUTO_INSTALL_API_MODELS

This is a boolean value that determines whether the backend should automatically run `client:generate` on startup. This is useful for development some times, but it is slow. It should be set to `false` in production.

e.g. if you're working on a feature and have the BE set to --watch and aut_install_api_models=true. The api client for FE will be built automatically if you change the BE.

### APP_MODULE_ENTITY_PATH and CORE_MODULE_ENTITY_PATH

These are the path that typeorm will scan for `*.entity.ts/js` files. These will be used to generate the database schema in migrations. Core module is the location of installed `nest-backend-libs` package which contains many database models.

### DOCKER_REDIS_PORT

This is only used for local docker configuration.

### EMAIL_SYNC_SEND_ENABLED

Slight miss-naming here. This will control if both sync or async emails are actually sent. It reduces spam if you're testing locally and don't want to send emails to real people.

### ENABLE_SUPER_POWERS

There are some apis that are destructive. At the moment they are only used for database cleanup during testing. Even though these features have full RBAC controls applied, this flag also removes the entire code path from production by default.

Arguably these features should be moved to a separate app that never gets deployed, but that would add complexity to Miller Start.

### GENERATE_SWAGGER

Swagger is the old name for OpenAPI. This flag will control if the swagger docs are generated on startup. It is important for development but because the generated file is not used on production you can set this to false there if you like.

### INVITATION_URLS_BASE_URL

This is used in the invitations emails to send customers to a frontend app.

### MIGRATIONS_PATH

This is the path that typeorm will scan for migration files. These will be used to update the real database schema.

### SMTP_EMAIL\_\*\*\* variables

These are used to configure the SMTP server that is used to send emails. Most email providers will have a SMTP server that you can use.

### SUPER_USER_IDS

You can add users ids here to give them the super powers permissions on login. This is useful for development and testing. But you should rely on roles in Auth0 where possible.
