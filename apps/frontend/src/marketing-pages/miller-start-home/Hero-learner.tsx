import StyledLink from "../../components/StyledLink";
import { Container } from "../../components/Container";
import codeImage from "./intro-media/code.png";
import dashboardImage from "./intro-media/dashboard.png";
import docsImage from "./intro-media/docs.png";
import Image from "next/image";
import { UserDto } from "@use-miller/shared-api-client";
import { CheckIcon } from "@heroicons/react/24/outline";

export function Hero({ user }: { user: UserDto }) {
    const features = [
        "Terraform scripts to deploy and manage Auth0, Stripe and deploying to Digital Ocean",
        "Authentication and authorization (Auth0)",
        "Organisations, Membership and Users Modules",
        "Subscriptions and payments (Stripe)",
        "Comprehensive OpenAPI documentation for ChatGPT plugin development",
        "Pre-built NestJs modules for useful APIs like Twitter or for running Stable Diffusion (graphics card not included with Miller!)",
        "Queues for async jobs are already setup and ready to use",
        "Send emails using popular providers (Twillio, Mailgun, Fastmail etc) via smtp and nodemailer",
        "Local development with docker-compose and pre-configured Postgres and Redis",
        "Safe database changes with migrations",
        "Miller is Node and React so you can run it on any hosting provider - Vercel, AWS, Azure, DigitalOcean",
        "and more...",
    ];
    const topFeatures = [
        {
            name: "NextJs",
            description:
                "NextJS is the dominant framework for React apps today. It's fast, easy to use and has a great community. Learn how to use SSR,SSG and client side dynamic components to build a fast, SEO friendly and responsive web app.",
        },
        {
            name: "NestJs",
            description:
                "NestJs is a backend application framework for node apps. It's built on express, fully typed, has a huge number of modules and functions out-of-the-box. We also wrote the most popular ESLint library for NestJS, we really know NestJS well",
        },
        {
            name: "Async Background Jobs",
            description:
                "Redis and Bull are pre-configured for you with docker-compose. Adding an async job is a simple decorator.",
        },
        {
            name: "Web app data models",
            description:
                "Miller comes with organisations, users, membership and subscriptions modules. These are all pre-configured and ready to use.",
        },
        {
            name: "Tailwind CSS",
            description:
                "Tailwind is a utility-first CSS framework. It's easy to learn and makes it easy to build responsive web apps.",
        },
        {
            name: "PostgreSQL for Data",
            description:
                "PostgreSQL is a powerful, open source object-relational datastore. It has excellent performance, ACID compliance, and a rich feature set.",
        },
        {
            name: "Authentication and Authorization",
            description:
                "Auth0 is pre-configured. Terraform configures the apps and test users for you. Learning a commercial auth provider is a great way to learn how to build a secure web app. Adding MFA is a simple config change.",
        },
        {
            name: "Payments",
            description:
                "Learn how Stripe is used in subscriptions and single payment models. Stripe is pre-configured and ready to use.",
        },
        {
            name: "CLI Tool for initialising your project",
            description:
                "The Miller CLI tool makes it easy to get started with a new project. It configures and runs terraform to deploy Auth0 and Stripe. It also sets file names and env files for you.",
        },
        {
            name: "Open Telemetry",
            description:
                "Miller has full-stack otel tracing configured by default. Each request is traced from the browser to the database. Easily find issues with your app locally and in production.",
        },
        {
            name: "Typescript Everywhere",
            description:
                "Every line of code is written in Typescript. This means you can learn how to use Typescript in a real-world application.",
        },
        {
            name: "End to End Testing",
            description:
                "Miller has a full suite of end-to-end tests. They are a great way to verify the system is working as expected after you make changes",
        },
        {
            name: "Full Open API Docs",
            description:
                "Open API specifications make it easy for other apps to integrate with your app. Miller comes with a full Open API specification for the API. Open AI / ChatGPT plugins can use this.",
        },
    ];
    const docsLink = `docs/miller-start/reference/miller-web/${btoa(
        "/README.md"
    )}`;
    const docsHref = `/docs/miller-start/get-started/introduction`;
    return (
        <Container className="pt-20 text-left">
            <div className="flex">
                <div className="flex flex-col">
                    <div
                        style={{
                            background:
                                "linear-gradient(#d2a8ff, #a371f7 10%, #196c2e 70%, #2ea043 80%, #56d364)",
                        }}
                        className="mr-4 h-full w-[2px] lg:mr-12"
                    >
                        &nbsp;
                    </div>
                </div>
                <div>
                    <div id="hero">
                        <div className="md:flex" id="features">
                            <div className="mr-8">
                                <h1 className="leading-snug mx-auto max-w-2xl font-display text-6xl font-medium tracking-tight text-white md:mx-0">
                                    Master full-stack web development
                                </h1>
                                <p className="mx-auto mt-6 max-w-2xl text-left text-lg text-gray-400 md:mx-0">
                                    Become a pro with NextJs, NestJs, Tailwind,
                                    PostgreSQL, Redis and more. Miller Start is
                                    a complete app starter for engineers who
                                    have completed beginner tutorials and are
                                    ready to advance.
                                </p>
                                <p className="mx-auto mt-6 max-w-2xl text-left text-lg text-gray-400 md:mx-0">
                                    Save months of time learning how to build
                                    and integrate common features to your app,
                                    skip straight to the good stuff - providing
                                    valuable features to your customers.
                                </p>
                            </div>
                            <div className="intro-image-rotation md:relative w-1/2 md:w-full mt-20 mb-32 md:mt-0 md:mb-0">
                                <div>
                                    <Image
                                        priority
                                        alt="admin image"
                                        src={dashboardImage}
                                        className="intro-image absolute md:-translate-y-16 md:translate-x-14 -translate-y-4 translate-x-2"
                                    />
                                    <Image
                                        priority
                                        alt="product image"
                                        src={docsImage}
                                        className="intro-image absolute md:-translate-x-7 translate-x-7"
                                    />
                                    <Image
                                        priority
                                        alt="code image"
                                        src={codeImage}
                                        className="intro-image md:translate-x-8 md:translate-y-32 translate-y-8"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mx-auto mt-36 flex gap-x-6 md:mx-0">
                            <dl className="col-span-2 grid grid-cols-1 gap-x-8 gap-y-10 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:gap-y-16">
                                {topFeatures.map((tf) => (
                                    <div
                                        key={tf.name}
                                        className="relative pl-9 "
                                    >
                                        <dt className="font-semibold text-white">
                                            <CheckIcon
                                                className="absolute left-0 top-1 h-5 w-5 text-green-500"
                                                aria-hidden="true"
                                            />
                                            {tf.name}
                                        </dt>
                                        <dd className="mt-2  text-gray-400">
                                            {tf.description}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                        <div className="mx-auto mt-10 flex gap-x-6 md:mx-0">
                            <StyledLink
                                href={"#pricing"}
                                color="violet"
                                className="rounded-lg  text-xl px-14 py-4 hover:shadow-lg"
                            >
                                Pricing
                            </StyledLink>
                            <StyledLink
                                href={docsHref}
                                color="violet"
                                className="rounded-lg text-xl px-14 py-4 hover:shadow-lg"
                            >
                                Read the docs
                            </StyledLink>
                            <StyledLink
                                href={docsLink}
                                color="violet"
                                className="rounded-lg  text-xl px-14 py-4 hover:shadow-lg"
                            >
                                Preview the code
                            </StyledLink>
                        </div>
                    </div>
                    <div className="mt-16">
                        <p className="mb-8 max-w-4xl text-left font-display text-4xl font-medium tracking-tight text-white">
                            What is Miller Start?
                        </p>
                        <p className="mt-4 text-left font-display text-lg font-medium text-gray-200">
                            Miller Start is learning tool for full stack
                            engineers. You'll have access to a frontend app,
                            backend app, a huge collection of integrations and
                            the scripts to set everything up. Miller is months
                            of dev work already completed, so you can learn how
                            fullstack apps are built and create your own app.
                        </p>
                        <p className="mt-8 text-left font-display text-lg font-medium text-gray-200">
                            Miller Start focuses on four main things:
                        </p>
                        <ul>
                            <li className="mt-4 ml-8 list-disc text-lg text-gray-200">
                                <strong>Fast setup.</strong> Miller is designed
                                to get you up and running locally in minutes.
                                We've scripted the setup (bash and terraform)
                                and have already integrated everything. NextJS
                                frontend and NestJS backend. Prebuilt website,
                                examples of common use cases and services.
                            </li>
                            <li className="mt-4 ml-8 list-disc text-lg text-gray-200">
                                <strong>Iteration speed.</strong> Tools
                                specifically integrated and configured to
                                increase safe iteration speed. Migrations, typed
                                clients, terraform, linting, testing. Managed
                                services like Stripe and Auth0 provide
                                extraordinary value to developers. Learn how to
                                leverage them in your project.
                            </li>
                            <li className="mt-4 ml-8 list-disc text-lg text-gray-200">
                                <strong>
                                    Simple architecture but safe for future
                                    success
                                </strong>{" "}
                                Miller is an architecture for small teams and
                                solo developers - monorepo, monolithic backend.
                                However it is also designed to be easy to extend
                                and scale with your success. Modular design
                                allows easy extraction to serverless where
                                needed. Use of Async jobs and caching are
                                built-in, configured and encouraged. It runs in
                                docker on any cloud provider.
                            </li>
                            <li className="mt-4 ml-8 list-disc text-lg text-gray-200">
                                <strong>Convention over configuration.</strong>{" "}
                                Miller comes with sensible defaults for a
                                production ready application. Consistent code is
                                encouraged with linting and formatting rules.
                                But you can override or turn off these rules if
                                you want. Nothing is hidden.
                            </li>
                        </ul>
                    </div>
                    <div className="mt-16" id="">
                        <p className="max-w-4xl text-left font-display text-3xl font-medium tracking-tight text-white sm:text-4xl">
                            What you get
                        </p>
                        <p className="mt-4 text-left font-display text-lg font-medium text-gray-200">
                            You will get access to the complete code for this
                            application (usemiller.dev). You can view the code
                            reference section in the docs to get a better idea
                            of the depth of the features. Here is a quick
                            overview:
                        </p>
                        <ul>
                            {features.map((feature, key) => (
                                <li
                                    key={key}
                                    className="mt-4 ml-8 list-disc text-lg text-gray-200"
                                >
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <div className="mx-auto mt-10 flex gap-x-6 md:mx-0">
                            <StyledLink
                                href={"#pricing"}
                                color="green"
                                className="rounded-lg text-xl px-14 py-4 hover:shadow-lg"
                            >
                                Pricing
                            </StyledLink>
                            <StyledLink
                                href={docsHref}
                                color="green"
                                className="rounded-lg text-xl px-14 py-4 hover:shadow-lg"
                            >
                                Read the docs
                            </StyledLink>
                            <StyledLink
                                href={docsLink}
                                color="green"
                                className="rounded-lg text-xl px-14 py-4 hover:shadow-lg"
                            >
                                Preview the code
                            </StyledLink>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}
