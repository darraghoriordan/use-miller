"use client";

import StyledLink from "../../components/StyledLink";
import { Container } from "../../components/Container";
import { CheckIcon } from "@heroicons/react/24/outline";
import { GithubLink } from "../index-home/SingleProductCard";
import {
    FadeInOnScroll,
    AnimatedHeadline,
    StaggerContainer,
    StaggerItem,
    ScanLine,
} from "../../components/Animations";
import {
    TerminalWindow,
    TerminalPrompt,
} from "../../components/TerminalWindow";
import {
    SecurityBadge,
    GitHubStarsBadge,
} from "../../components/SecurityBadge";
import type { components } from "../../shared/types/api-specs";

type UserDto = components["schemas"]["UserDto"];

export function Hero({ user }: { user: UserDto }) {
    const features = [
        "Terraform scripts to deploy and manage Auth0, Stripe and deploying to Digital Ocean",
        "Authentication and authorization (Auth0)",
        "Organisations, Membership and Users Modules",
        "Subscriptions and payments (Stripe)",
        "Comprehensive OpenAPI documentation for ChatGPT plugin development",
        "Pre-built NestJs modules for useful APIs",
        "Queues for async jobs are already setup and ready to use",
        "Send emails using popular providers via smtp and nodemailer",
        "Local development with docker-compose and pre-configured Postgres and Redis",
        "Safe database changes with migrations",
        "Run on any hosting provider - Vercel, AWS, Azure, DigitalOcean",
    ];

    const topFeatures = [
        {
            name: "NextJs + NestJs",
            description:
                "Full-stack with the most popular React framework and the most powerful Node.js backend framework.",
        },
        {
            name: "Security First",
            description:
                "Auth0 pre-configured with MFA support. Our ESLint plugin catches security issues at lint time.",
        },
        {
            name: "Async Background Jobs",
            description:
                "Redis and Bull pre-configured with docker-compose. Adding an async job is a simple decorator.",
        },
        {
            name: "PostgreSQL + TypeORM",
            description:
                "Type-safe database access with migrations. ACID compliant and production ready.",
        },
        {
            name: "Payments Ready",
            description:
                "Stripe integration for subscriptions and one-time payments. Webhook handling included.",
        },
        {
            name: "OpenTelemetry",
            description:
                "Full-stack tracing configured by default. Each request traced from browser to database.",
        },
    ];

    const docsLink = `docs/miller-start/reference/miller-web/${btoa("/README.md")}`;
    const docsHref = `/docs/miller-start/get-started/introduction`;

    return (
        <div className="relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 bg-grid opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-security-black" />
            <ScanLine />

            <Container className="relative pt-16 md:pt-24 pb-16">
                {/* Hero Section */}
                <div className="max-w-4xl">
                    <AnimatedHeadline delay={0.1}>
                        <div className="mb-6 flex items-center gap-3">
                            <span className="font-mono text-sm text-product-millerstart uppercase tracking-wider">
                                Full-Stack Template
                            </span>
                            <GitHubStarsBadge stars={50} />
                        </div>
                    </AnimatedHeadline>

                    <AnimatedHeadline delay={0.2}>
                        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-security-light leading-tight tracking-tight">
                            Security-first NestJS template
                        </h1>
                    </AnimatedHeadline>

                    <AnimatedHeadline delay={0.4}>
                        <p className="mt-6 text-lg md:text-xl text-security-text max-w-2xl leading-relaxed">
                            Master full-stack development with a
                            production-ready starter. NextJS, NestJS,
                            PostgreSQL, Auth0, Stripe, and Terraform - all
                            pre-configured with security best practices.
                        </p>
                    </AnimatedHeadline>

                    <AnimatedHeadline delay={0.5}>
                        <div className="mt-6 flex flex-wrap items-center gap-3">
                            <SecurityBadge icon="shield" variant="accent">
                                Hardened Defaults
                            </SecurityBadge>
                            <SecurityBadge icon="code" variant="accent">
                                Open Source
                            </SecurityBadge>
                            <SecurityBadge icon="lock" variant="accent">
                                Auth0 + MFA Ready
                            </SecurityBadge>
                        </div>
                    </AnimatedHeadline>

                    <AnimatedHeadline delay={0.6}>
                        <div className="mt-8">
                            <GithubLink githubUrl="https://github.com/darraghoriordan/use-miller" />
                        </div>
                    </AnimatedHeadline>

                    <AnimatedHeadline delay={0.7}>
                        <div className="mt-8 flex flex-wrap items-center gap-4">
                            <StyledLink
                                href="#pricing"
                                color="millerstart"
                                className="text-base px-8 py-3"
                            >
                                Try for free
                            </StyledLink>
                            <StyledLink
                                href={docsHref}
                                color="millerstart"
                                variant="outline"
                                className="text-base px-8 py-3"
                            >
                                Read the docs
                            </StyledLink>
                            <StyledLink
                                href={docsLink}
                                color="millerstart"
                                variant="ghost"
                                className="text-base"
                            >
                                Preview code
                            </StyledLink>
                        </div>
                    </AnimatedHeadline>
                </div>

                {/* Terminal Demo */}
                <FadeInOnScroll
                    delay={0.2}
                    className="mt-16 md:mt-20 max-w-3xl"
                >
                    <TerminalWindow title="~/miller-start">
                        <TerminalPrompt
                            command="pnpm create miller-app my-saas"
                            output={`[OK] Cloning template...
[OK] Installing dependencies...
[OK] Running security audit...
[OK] Configuring Auth0...
[OK] Setting up Stripe...
[DONE] Your secure app is ready!`}
                        />
                    </TerminalWindow>
                </FadeInOnScroll>

                {/* Features Grid */}
                <section id="features" className="mt-24 md:mt-32">
                    <FadeInOnScroll>
                        <h2 className="font-display text-2xl md:text-3xl text-security-light mb-12">
                            What's included
                        </h2>
                    </FadeInOnScroll>

                    <StaggerContainer
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        staggerDelay={0.1}
                    >
                        {topFeatures.map((feature) => (
                            <StaggerItem key={feature.name}>
                                <div className="p-6 bg-security-dark border border-security-border rounded-lg hover:border-product-millerstart/50 transition-colors">
                                    <div className="flex items-start gap-3">
                                        <CheckIcon className="h-5 w-5 text-product-millerstart flex-shrink-0 mt-0.5" />
                                        <div>
                                            <h3 className="font-display text-lg text-security-light mb-2">
                                                {feature.name}
                                            </h3>
                                            <p className="text-sm text-security-text">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </section>

                {/* What is Miller Start */}
                <FadeInOnScroll className="mt-24">
                    <div className="max-w-3xl">
                        <h2 className="font-display text-2xl md:text-3xl text-security-light mb-6">
                            What is Miller Start?
                        </h2>
                        <div className="space-y-4 text-security-text">
                            <p>
                                Miller Start is a learning tool for full-stack
                                engineers. You'll get access to a complete
                                frontend app, backend app, integrations, and the
                                scripts to set everything up.
                            </p>
                            <p>
                                It focuses on:{" "}
                                <strong className="text-security-light">
                                    Fast setup
                                </strong>{" "}
                                with scripted configuration,{" "}
                                <strong className="text-security-light">
                                    Iteration speed
                                </strong>{" "}
                                with migrations and typed clients,{" "}
                                <strong className="text-security-light">
                                    Simple architecture
                                </strong>{" "}
                                that scales, and{" "}
                                <strong className="text-security-light">
                                    Convention over configuration
                                </strong>
                                .
                            </p>
                        </div>
                    </div>
                </FadeInOnScroll>

                {/* Full Features List */}
                <FadeInOnScroll className="mt-16">
                    <h2 className="font-display text-2xl md:text-3xl text-security-light mb-8">
                        Everything you get
                    </h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {features.map((feature, i) => (
                            <li
                                key={i}
                                className="flex items-start gap-2 text-security-text"
                            >
                                <CheckIcon className="h-4 w-4 text-product-millerstart flex-shrink-0 mt-1" />
                                <span className="text-sm">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </FadeInOnScroll>

                {/* CTA */}
                <FadeInOnScroll className="mt-16">
                    <div className="flex flex-wrap items-center gap-4">
                        <StyledLink
                            href="#pricing"
                            color="primary"
                            className="text-base px-8 py-3"
                        >
                            Get started free
                        </StyledLink>
                        <StyledLink
                            href={docsHref}
                            color="primary"
                            variant="outline"
                            className="text-base px-8 py-3"
                        >
                            Read the docs
                        </StyledLink>
                        <StyledLink
                            href={docsLink}
                            color="primary"
                            variant="ghost"
                            className="text-base"
                        >
                            Preview code
                        </StyledLink>
                    </div>
                </FadeInOnScroll>
            </Container>
        </div>
    );
}
