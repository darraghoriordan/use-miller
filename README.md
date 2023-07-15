# Miller Start

Miller start is a full stack application you can use to learn NextJs and NestJS and accelerate your own product builds.

This is the code that powers the [Miller Start website](https://usemiller.dev) and some other apps I run. There is full documentation available [here](https://usemiller.dev/docs/miller-start/get-started/quick-start).

The backend uses a set of libraries I have built over years and that is available on GitHub as [nest-backend-libs](https://github.com/darraghoriordan/nest-backend-libs).

# The purpose of Miller Start

Miller start is a full stack application you can use to learn NextJs and NestJS.

It is also a way to quickly build your own applications using these technologies.

I also use it a place to keep examples for my blog posts and learning on https://www.darraghoriordan.com.

## Navigating the code

You can navigate the code on the miller start website like in an IDE. This README content will change if you navigate to any sub directory which contains a README that is relevant to that directory.

The main monorepo is this repo - `use-miller`. The other important repo is `nest-backend-libs` which contains the shared libraries for the backend.

Both of these repos are available in the miller docs and on the GitHub repos.

## Folder Structure

Miller start is a monorepo with the following structure:

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
