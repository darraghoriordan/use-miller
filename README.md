# Miller Start

Miller start is a full stack application you can use to learn NextJs and NestJS and accelerate your own product builds. There is full documentation available on the [Miller Start website](https://usemiller.dev).

## Navigating the code

You can navigate the code like in an IDE. This README content will change if you navigate to any sub directory which contains a README that is relevant to that directory.

The main monorepo is this repo - `use-miller`. The other important repo is `nest-backend-libs` which contains the shared libraries for the backend. Both of these repos are available in these docs and on the GitHub repos you have been invited to.

## Folder Structure

```txt
apps
  ├── backend (NestJS backend)
  ├── backend-e2e (Jest e2e api tests)
  ├── frontend (NextJS frontend)
infrastructure
  ├── local-dev (Terraform for local development)
  ├── production (Terraform for production)
libs
  ├── projectDeploy (Scripts for deploying the project)
  ├── projectSetup (Scripts for initialising a new project)
  ├── shared-api-client (Typescript client built from OpenAPI spec)
```
