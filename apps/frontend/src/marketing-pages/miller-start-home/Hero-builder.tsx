import StyledLink from "../../components/StyledLink";
import { Container } from "../../components/Container";
import codeImage from "./intro-media/code.png";
import dashboardImage from "./intro-media/dashboard.png";
import docsImage from "./intro-media/docs.png";
import Image from "next/image";
import { UserDto } from "@use-miller/shared-api-client";
import { BuyNowButton } from "../../components/BuyNowButton.jsx";

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
    const docsLink = `docs/miller-start/reference/miller-web/${btoa(
        "/README.md"
    )}`;
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
                        <div className="md:flex">
                            <div className="mr-8">
                                <h1 className="leading-snug mx-auto max-w-2xl font-display text-6xl font-medium tracking-tight text-white md:mx-0">
                                    A NestJS and NextJS SaaS kit for busy devs
                                </h1>
                                <p className="mx-auto mt-6 max-w-2xl text-left text-lg tracking-tight text-gray-400 md:mx-0">
                                    Setup a new project with NestJs, NextJS,
                                    Postgres, React, Tailwind, Stripe and Auth0
                                    in minutes.
                                </p>
                                <p className="mx-auto mt-6 max-w-2xl text-left text-lg tracking-tight text-gray-400 md:mx-0">
                                    Save months of time and skip straight to the
                                    good stuff - providing valuable features to
                                    your customers.
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
                        <div className="mx-auto mt-10 flex gap-x-6 md:mx-0">
                            <BuyNowButton
                                user={user}
                                productKey="miller-start"
                                color="violet"
                            />
                            <StyledLink
                                href={docsLink}
                                color="violet"
                                className="rounded-lg  text-xl px-14 py-4 hover:shadow-lg"
                            >
                                View the code
                            </StyledLink>
                        </div>
                    </div>
                    <div className="mt-16" id="features">
                        <p className="mb-8 max-w-4xl text-left font-display text-4xl font-medium tracking-tight text-white">
                            What is Miller Start?
                        </p>
                        <p className="mt-4 text-left font-display text-lg font-medium tracking-tight text-gray-200">
                            Miller Start is a frontend app, backend app, a
                            collection of integrations and scripts to set
                            everything up. Miller is months of dev work already
                            completed, for developers with lots of ideas, but
                            not much time.
                        </p>
                        <p className="mt-8 text-left font-display text-lg font-medium tracking-tight text-gray-200">
                            Miller Start focuses on four main things:
                        </p>
                        <ul>
                            <li className="mt-4 ml-8 list-disc text-lg text-gray-200">
                                <strong>Fast setup.</strong> Miller is designed
                                to get you up and running locally in minutes.
                                We've scripted setup and already integrated
                                everything. NextJS frontend and NestJS backend.
                                Prebuilt website, examples of common use cases
                                and services.
                            </li>
                            <li className="mt-4 ml-8 list-disc text-lg text-gray-200">
                                <strong>Iteration speed.</strong> Tools
                                specifically integrated and configured to
                                increase safe iteration speed. Migrations, typed
                                clients, terraform, linting, testing. Managed
                                services like Stripe and Auth0 provide
                                extraordinary value to developers. You can turn
                                anything off if you don't need it.
                            </li>
                            <li className="mt-4 ml-8 list-disc text-lg text-gray-200">
                                <strong>
                                    Simple start but safe for future success
                                </strong>{" "}
                                Miller is designed to be a "simple" starting
                                point for small teams and solo developers -
                                monorepo, monolithic backend. However it is also
                                designed to be easy to extend and scale with
                                your success. Modular design allows extraction
                                to serverless where needed. Async jobs and
                                caching are built in. The NestJS backend is
                                stateless.
                            </li>
                            <li className="mt-4 ml-8 list-disc text-lg text-gray-200">
                                <strong>Convention over configuration.</strong>{" "}
                                Miller comes with sensible defaults for a
                                production ready application but you can
                                override them if you want. Nothing is hidden.
                                Consistent code is encouraged with linting and
                                formatting rules.
                            </li>
                        </ul>
                    </div>
                    <div className="mt-16" id="">
                        <p className="max-w-4xl text-left font-display text-3xl font-medium tracking-tight text-white sm:text-4xl">
                            What you get
                        </p>
                        <p className="mt-4 text-left font-display text-lg font-medium tracking-tight text-gray-200">
                            This site is built with Miller, you're using what
                            you get with the package. You can view the code in
                            the docs section to get a better idea of the depth
                            of the features. Here is a quick overview:
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
                            <BuyNowButton
                                user={user}
                                color="green"
                                productKey="miller-start"
                            />
                            <StyledLink
                                href={docsLink}
                                color="green"
                                className="rounded-lg text-xl px-14 py-4 hover:shadow-lg"
                            >
                                View the code
                            </StyledLink>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}
