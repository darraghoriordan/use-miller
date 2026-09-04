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
import { trackAnalyticsEvent } from "../../lib/analytics";

export function Hero() {
    const features = [
        "Terraform scripts for Stripe and DigitalOcean deployment",
        "Self-hosted authentication with cookie and bearer sessions",
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
                "Better Auth is hosted in your API with no identity SaaS account. Our ESLint plugin catches security issues at lint time.",
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
                                Agent-ready full-stack template
                            </span>
                            <GitHubStarsBadge stars={50} />
                        </div>
                    </AnimatedHeadline>

                    <AnimatedHeadline delay={0.2}>
                        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-security-light leading-tight tracking-tight">
                            Describe your app. Let your coding agent handle the
                            setup.
                        </h1>
                    </AnimatedHeadline>

                    <AnimatedHeadline delay={0.4}>
                        <p className="mt-6 text-lg md:text-xl text-security-text max-w-2xl leading-relaxed">
                            Miller gives Codex and other coding agents a safe,
                            deterministic path from an application name to a
                            working NestJS, Next.js, PostgreSQL, Better Auth,
                            Stripe, and Terraform project.
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
                                Auth without SaaS lock-in
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
                                href="/start.md"
                                color="millerstart"
                                onClick={() =>
                                    trackAnalyticsEvent(
                                        "miller_start_agent_click",
                                        { source: "miller_start_hero" },
                                    )
                                }
                                className="text-base px-8 py-3"
                            >
                                Create with your agent
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
                            command="Follow https://usemiller.dev/start.md and create my app."
                            output={`[ASK] What should your application be called?
[PLAN] Derive the slug and project directory
[CREATE] Install the versioned Miller starter
[REPORT] Explain what is ready and what needs you
[APPROVAL] Stop before production changes`}
                        />
                    </TerminalWindow>
                </FadeInOnScroll>

                {/* Agent-ready foundation */}
                <section
                    className="mt-24 md:mt-32"
                    aria-labelledby="agent-ready-heading"
                >
                    <FadeInOnScroll>
                        <div className="max-w-3xl">
                            <span className="font-mono text-xs uppercase tracking-[0.22em] text-product-millerstart">
                                Built for coding agents
                            </span>
                            <h2
                                id="agent-ready-heading"
                                className="mt-4 font-display text-2xl md:text-4xl text-security-light"
                            >
                                Give AI great engineering foundations and focus
                                on your product
                            </h2>
                            <p className="mt-5 text-lg leading-relaxed text-security-text">
                                Miller gives Codex, Claude Code, and compatible
                                agents foundational context, examples and
                                deterministic tools they need to start building
                                great software from an empty project.
                            </p>
                        </div>
                    </FadeInOnScroll>

                    <StaggerContainer
                        className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2"
                        staggerDelay={0.14}
                    >
                        <StaggerItem>
                            <article className="relative h-full overflow-hidden rounded-lg border border-security-border bg-security-dark p-6 md:p-8">
                                <div className="absolute right-5 top-4 font-mono text-5xl text-product-millerstart/10">
                                    01
                                </div>
                                <div className="relative">
                                    <span className="font-mono text-xs uppercase tracking-[0.18em] text-product-millerstart">
                                        Engineering foundations for agents
                                    </span>
                                    <h3 className="mt-3 font-display text-xl text-security-light">
                                        Context, examples, and rules
                                    </h3>
                                    <p className="mt-3 leading-relaxed text-security-text">
                                        Architecture boundaries, product intent,
                                        migration rules, security expectations,
                                        and verification commands are written
                                        down where an agent can find them.
                                    </p>
                                    <div className="mt-6 rounded-md border border-security-border bg-security-darker p-4 font-mono text-sm">
                                        <p className="text-security-muted">
                                            <span className="text-product-millerstart">
                                                ├─
                                            </span>{" "}
                                            AGENTS.md
                                        </p>
                                        <p className="text-security-muted">
                                            <span className="text-product-millerstart">
                                                ├─
                                            </span>{" "}
                                            PRODUCT.md
                                        </p>
                                        <p className="text-security-muted">
                                            <span className="text-product-millerstart">
                                                ├─
                                            </span>{" "}
                                            ARCHITECTURE.md
                                        </p>
                                        <p className="text-security-light">
                                            <span className="text-product-millerstart">
                                                └─
                                            </span>{" "}
                                            skills/use-miller/SKILL.md
                                        </p>
                                    </div>
                                </div>
                            </article>
                        </StaggerItem>

                        <StaggerItem>
                            <article className="relative h-full overflow-hidden rounded-lg border border-security-border bg-security-dark p-6 md:p-8">
                                <div className="absolute right-5 top-4 font-mono text-5xl text-product-millerstart/10">
                                    02
                                </div>
                                <div className="relative">
                                    <span className="font-mono text-xs uppercase tracking-[0.18em] text-product-millerstart">
                                        A CLI agents can trust
                                    </span>
                                    <h3 className="mt-3 font-display text-xl text-security-light">
                                        Inspect, plan, then apply
                                    </h3>
                                    <p className="mt-3 leading-relaxed text-security-text">
                                        The Miller CLI reports local and
                                        production readiness telling your agent
                                        exactly what to do. Your agent gets
                                        exact next engineering steps so you
                                        don't have to guess.
                                    </p>
                                    <div className="mt-6 rounded-md border border-security-border bg-security-darker p-4 font-mono text-sm">
                                        <p className="break-all text-security-light">
                                            <span className="text-product-millerstart">
                                                $
                                            </span>{" "}
                                            pnpm run mill -- report --profile
                                            all --json
                                        </p>
                                        <div className="mt-3 space-y-1 text-security-muted">
                                            <p>
                                                <span className="text-accent">
                                                    ✓
                                                </span>{" "}
                                                local: ready
                                            </p>

                                            <p>
                                                <span className="text-product-millerstart">
                                                    →
                                                </span>{" "}
                                                production: 2 inputs needed
                                            </p>
                                            <p>
                                                <span className="text-product-millerstart">
                                                    →
                                                </span>{" "}
                                                next: missing stripe product map
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </StaggerItem>
                    </StaggerContainer>
                </section>

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
                                Miller Start is an application foundation for
                                anyone working with coding agents. You get a
                                complete frontend, backend, integrations,
                                infrastructure, and the CLI an agent needs to
                                configure them reliably.
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
