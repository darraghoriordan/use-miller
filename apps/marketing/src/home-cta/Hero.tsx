import StyledLink from "../components/StyledLink";
import { Container } from "../components/Container";
import codeImage from "../intro-media/code.png";
import adminImage from "../intro-media/admin.png";
import productImage from "../intro-media/product.png";
import Image from "next/image";

export function Hero() {
    const features = [
        "Organisations and Users",
        "Subscriptions and payments (Stripe)",
        "Authentication and authorization (Auth0)",
        "Pre-built NestJs modules for useful APIs like Twitter or for running Stable Diffusion (graphics card not included with Miller!)",
        "Queues for async jobs are already setup and ready to use",
        "Send emails using popular providers (Twillio, Mailgun, Fastmail etc) via smtp and nodemailer",
        "Local development with docker-compose and pre-configured Postgres and Redis",
        "Safe database changes with migrations",
        "Terraform scripts to deploy and manage Auth0, Stripe and deploying to Digital Ocean",
        "Miller is just Node and React so you can run it on any hosting provider",
        "and more...",
    ];

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
                                    A Nest JS and React SaaS kit for busy devs
                                </h1>
                                <p className="mx-auto mt-6 max-w-2xl text-left text-lg tracking-tight text-gray-400 md:mx-0">
                                    Setup a new project with NestJs,Postgres,
                                    React, Tailwind, Stripe and Auth0 in
                                    minutes. Save months of time and skip
                                    straight to the good stuff - providing
                                    valuable features to your customers.
                                </p>
                            </div>
                            <div className="intro-image-rotation md:relative w-1/2 md:w-full mt-20 mb-32 md:mt-0 md:mb-0">
                                <div>
                                    <Image
                                        alt="admin image"
                                        src={adminImage}
                                        className="intro-image absolute md:-translate-y-16 md:translate-x-14 -translate-y-4 translate-x-2"
                                    />
                                    <Image
                                        alt="product image"
                                        src={productImage}
                                        className="intro-image absolute md:-translate-x-7 translate-x-7"
                                    />
                                    <Image
                                        alt="code image"
                                        src={codeImage}
                                        className="intro-image md:translate-x-8 md:translate-y-32 translate-y-8"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mx-auto mt-10 flex gap-x-6 md:mx-0">
                            <StyledLink
                                href={"/payment/init-payment"}
                                color="violet"
                                className="rounded-lg text-xl px-14 py-4 hover:shadow-lg border-white"
                            >
                                Buy now
                            </StyledLink>
                            <StyledLink
                                href={"docs/reference/miller"}
                                color="violet"
                                className=" rounded-lg  text-xl px-14 py-4 hover:shadow-lg"
                            >
                                View the code
                            </StyledLink>
                            <StyledLink
                                href={"docs"}
                                color="violet"
                                className=" rounded-lg  text-xl px-14 py-4 hover:shadow-lg"
                            >
                                View the docs
                            </StyledLink>
                        </div>
                    </div>
                    <div className="mt-16" id="about">
                        <p className="mb-8 max-w-4xl text-left font-display text-4xl font-medium tracking-tight text-white">
                            What is Miller?
                        </p>
                        <p className="mt-4 text-left font-display text-lg font-medium tracking-tight text-gray-200">
                            Miller is a frontend app, backend app, marketing
                            app, a collection of scripts and NestJs libraries
                            that are all integrated with Stripe and Auth0.
                            Miller is months of dev work already completed, for
                            people with lots of ideas, but not a lot of time.
                        </p>
                        <p className="mt-8 text-left font-display text-lg font-medium tracking-tight text-gray-200">
                            Miller focuses on four main things:
                        </p>
                        <ul>
                            <li className="mt-4 ml-8 list-disc text-lg text-gray-200">
                                <strong>Fast setup.</strong> Miller is designed
                                to get you up and running locally in minutes.
                                We've already integrated everything. We've
                                written the scripts to automate initialisation.
                            </li>
                            <li className="mt-4 ml-8 list-disc text-lg text-gray-200">
                                <strong>Leverage services.</strong> Managed
                                services like Stripe and Auth0 provide
                                extraordinary value to developers. Our terraform
                                scripts will configure and manage these for you
                                in seconds. They are already integrated into the
                                frontend and backend apps.
                            </li>
                            <li className="mt-4 ml-8 list-disc text-lg text-gray-200">
                                <strong>
                                    Avoid chasing the latest technology.
                                </strong>{" "}
                                You probably don't need Kubernetes for your
                                first 10 customers. Your customers don't care,
                                they want their problem solved. Just start
                                shipping.
                            </li>
                            <li className="mt-4 ml-8 list-disc text-lg text-gray-200">
                                <strong>Convention over configuration.</strong>{" "}
                                Miller comes with sensible defaults for a
                                production ready application but you can
                                override them if you want. Nothing is hidden.
                            </li>
                        </ul>
                    </div>
                    <div className="mt-16" id="features">
                        <p className="max-w-4xl text-left font-display text-3xl font-medium tracking-tight text-white sm:text-4xl">
                            What you get
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
                                href={"/payment/init-payment"}
                                color="green"
                                className="rounded-lg text-xl px-14 py-4 hover:shadow-lg border-white"
                            >
                                Buy now
                            </StyledLink>
                            <StyledLink
                                href={"/payment/init-payment"}
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
