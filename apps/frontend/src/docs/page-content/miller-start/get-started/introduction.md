---
title: "Introduction"
date: "2020-01-01"
order: 10
---

Miller Start is a fullstack application example for learning and building javascript applications.

Miller is designed to give real examples of how to implement common features in a SaaS app. Miller is used to run this website, so every change or fix in this website code is reflected back into the product.

## Miller outline

Miller is a monolithic NestJS backend with a NextJS frontend in a monorepo configuration.

Design principals are:

1. For the solo developer with very little budget (<$200/year)
1. Likely a small user base (<5000 DAU)
1. Ability to grow with success - easily extract microservices or serverless functions later, api clients other than web apps in the future (e.g. a mobile app or ChatGPT plugin)
1. Provide common features and delete or ignore what's not needed

Miller Start deliberately avoids the use of microservices, kubernetes, serverless and other "cloud first" technologies. It's designed to be simple to run, easy to understand and easy to manage.

I do realise this may be a controversial to some developers, but I use serverless and cloud every day in my day job, so I do understand the benefits and also the complexity these technologies bring.

![Miller overview](./diagrams/miller.drawio.svg)

## Who is Miller for?

If you've done some courses or have a couple of years experience with web dev, you should find Miller's depth of content very useful.

It uses dependency injection, typescript, linting, testing, CI/CD, docker, terraform and many modern dev tools that encourage consistency and correct our code as we build and help us move faster in the long run. It comes with additional support like custom bash scripts and tools, redis queues, multi-stage docker builds, infrastructure-as-code and code quality automations that you will commonly find "production" applications.

If you're a Java or .Net developer learning about NodeJS-land, you will find that Miller is a great way to quickly learn the tools in the NodeJS ecosystem. Everything is typed, dependency injection is used, linting and testing are built-in and the project is designed to be modular and easy extend.

I don't really explain html, css, javascript in-depth here. If you're just learning how to code, [Free Code Camp](https://www.freecodecamp.org/) and [The Odin Project](https://www.theodinproject.com/) are excellent resources for learning how to code web apps.

Tl;dr - Miller is designed for

-   developers who have some prior-experience,
-   or devs who have finished a bootcamp and tutorials and want to continue their learning in a SaaS app.
-   anyone stuck with some aspect of getting a NodeJs or NextJs app up and running.

## Miller structure

Miller is a monorepo structure with all applications in one repo and directory.

The backend functionality that is common to most SaaS applications is extracted to a library called `nest-backend-libs`. This library is used by Miller Start and reduces the amount of code in the main application.

You can see these two project structures in the Code Reference section.

The library is modular and you have full access to it. You can just copy-paste the library code into your project to edit, if you don't want to use the library as-is.
