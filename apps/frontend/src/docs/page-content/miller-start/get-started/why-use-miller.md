---
title: "Why Miller Start"
date: "2020-06-13"
order: 5
---

## 1. Miller Start gets you past the hard parts

NextJS and NestJS are great frameworks, but they are not easy to start a real application with.

Miller Start has already done the hard work of setting up the project structure, linting, testing, CI/CD, docker, terraform, authentication, authorization, database, redis, queues, logging, monitoring, error handling, etc that most SaaS apps with customers need.

## 2. Authentication and Authorization

Miller Start has a full authentication and authorization system built in with Better Auth.
It runs inside the NestJS API and stores sessions in your PostgreSQL database, so local and
production setup need no separate identity tenant. The included Next.js app uses secure
cookies; independent SPAs and streaming clients can use signed bearer tokens against the
same backend guard.

## 3. Project structure

With any SaaS app you'll need to manage customers, organisations, products and payments. Miller Start has all of these entities already setup for you in the database and api. There are integration tests that test the common use cases for each entity.

The models for project structure are all defined with strict Open API specifications so that a client can automatically be generated for any api client language. The frontend and integration tests are both setup to use the generated typescript client out of the box.

## 4. Payments

Miller Start has a full payments system built-in via Stripe. Again, everything is already integrated and ready to go. The backend owns the product catalog, so browsers never choose a Stripe price or payment mode directly.

Miller start comes with examples of subscription products and one-off products. You can easily add your own products and pricing. Webhooks are already configured in NestJs with signature verification, durable event storage, retries, replay tooling, and idempotent fulfilment.

Developer experience is a priority in Miller Start. Terraform can manage your Stripe products and prices, while deployment configuration supplies their IDs through the server-side catalog.

## 5. Database

Miller Start uses Postgres as the database. Local development environment is setup for you with docker-compose. Production is up to you but there is an example of configuring a Postgres database in dokku using terraform.

Database migrations are already configured out of the box. They work with typescript and there are some helper commands to make it easier to use in NestJs.

## 6. Redis

Miller Start uses Redis for caching and queues on the backend. Local development environment is setup for you with docker-compose.

## 7. Logging and Telemetry

Miller Start is pre-configured with pino logging on the NestJS backend.

Both the frontend and backend are configured to use Open Telemetry and request tracing is configured across the frontend, backend and services out of the box.

Honeycomb is provided as an example backend for your telemetry because they have a generous free tier, but with Open Telemetry you can push telemetry events to any backend you like, e.g. Datadog, New Relic, etc.

## 8. Local development

Miller Start is setup to use docker-compose for local development. This means that you can run the entire application infrastructure locally with a single command.

When it's time to go to production you use the same code with simple changes to environment variables.

## 8. Dockerized deployment

Miller Start uses a dockerized deployment for frontend and backend. This means that you can deploy the application to any cloud provider that supports docker containers.
