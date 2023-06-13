---
title: "NestJs and NestJs"
date: "2020-06-13"
order: 40
---

## Why NestJS and NextJS?

You'll notice that Miller Start uses both NestJS and NextJS. Why is that?

NextJs is a great framework for building frontend applications. It's easy to get started with and provides some neat features for server-side api development.

The issue with NextJs is that the framework promotes mixing frontend and backend code together. This is a great approach for starting out because you can move extremely quickly.

However this approach has disadvantages where the application grows in size and complexity. It becomes harder to maintain and test the application. It also becomes harder to scale the application because you can't scale the frontend and backend independently.

There is also an issue around hosting options for NextJs where vercel quickly becomes very expensive.

Finally if you're successful you might have many clients for your api data. There may be test applications, native mobile apps for Android and iOS. NextJs is primarily designed for web applications. You can design your NextJs api to be used by other clients, but it's not the primary use case.

NestJS is a great framework for building backend applications. It provides a huge amount of functionality out of the box and is very easy to extend. There are community libraries for almost every use case you can think of.

## When to use NextJs only

If you're building an application that will only ever be used by a web browser, then NextJs is a great choice. You can build a fullstack application very quickly and easily.

Miller Start supports this - just delete the `apps/backend` directory and you're good to go. You'll have to reimplement any backend functionality you need in the NextJs app, but that's not too hard if you use the NestJs code as a template.
