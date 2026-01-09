"use client";

import { Container } from "../../components/Container";
import { GitHubIcon } from "../../components/GithubIcon";
import {
    TypewriterText,
    AnimatedHeadline,
    FadeInOnScroll,
    StaggerContainer,
    StaggerItem,
    ScanLine,
} from "../../components/Animations";
import { TrustBadges } from "../../components/SecurityBadge";
import { SingleProductCard } from "./SingleProductCard";
import { OpenSourceSection } from "./OpenSourceSection";
import { ThemeColor } from "../../styles/themeColors";
import type { components } from "../../shared/types/api-specs";
import {
    TerminalWindow,
    TerminalPrompt,
} from "../../components/TerminalWindow";
import Link from "next/link";

type UserDto = components["schemas"]["UserDto"];

export interface HeroProduct {
    colorVariant: ThemeColor;
    title: string;
    blurb: string;
    benefits: string[];
    learnMoreLinkUrl: string;
    learnMoreLinkText: string;
    altLinkText: string;
    altLink: string;
    altAltLinkText?: string;
    altAltLink?: string;
    githubUrl?: string;
    stars?: number;
}

export function Hero({ user }: { user: UserDto }) {
    const products: HeroProduct[] = [
        {
            title: "Dev Shell",
            blurb: "Reproducible, auditable dev environments",
            learnMoreLinkUrl: "/dev-shell",
            learnMoreLinkText: "Explore Dev Shell",
            altLinkText: "Preview source",
            altLink:
                "/docs/dev-shell/reference/dev-shell-scripts/L1JFQURNRS5tZA==",
            benefits: [
                "Set up a new machine in minutes with tested scripts",
                "50+ pre-configured modern developer tools",
                "Consistent shell experience on Mac and Windows WSL",
                "Full source code access - customize to your needs",
            ],
            colorVariant: "devshell",
        },
        {
            title: "Local Dev Tools",
            blurb: "Keep your data local. Zero cloud dependencies.",
            learnMoreLinkUrl: "/local-dev-tools",
            learnMoreLinkText: "Try free",
            altLinkText: "Preview source",
            altLink:
                "/docs/local-dev-tools/reference/ssh-tool-new-electron/L3NyYy9hcHAvaW5kZXgudHN4",
            altAltLinkText: "Download now",
            altAltLink: "/local-dev-tools#download",
            benefits: [
                "Offline utilities for Git, SSH, and development",
                "Your business data never leaves your machine",
                "Universal app for Mac and Windows",
                "Perpetual license - not a SaaS subscription",
            ],
            colorVariant: "localtools",
        },
        {
            title: "Miller Start",
            blurb: "Security-first NestJS template with hardened defaults",
            githubUrl: "https://github.com/darraghoriordan/use-miller",
            learnMoreLinkUrl: "/miller-start",
            learnMoreLinkText: "Explore template",
            altLinkText: "Preview source",
            altLink: "/docs/miller-start/reference/miller-web/L1JFQURNRS5tZA==",
            stars: 50,
            benefits: [
                "Full-stack NestJS + Next.js + PostgreSQL starter",
                "Auth0, Stripe, and OpenTelemetry pre-configured",
                "Security best practices built-in from day one",
                "Complete with Terraform infrastructure scripts",
            ],
            colorVariant: "millerstart",
        },
    ];

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
                        <div className="mb-6">
                            <span className="font-mono text-sm text-accent uppercase tracking-wider">
                                Secure Developer Tools
                            </span>
                        </div>
                    </AnimatedHeadline>

                    <AnimatedHeadline delay={0.2}>
                        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-security-light leading-tight tracking-tight">
                            <span className="hidden md:inline">
                                <TypewriterText
                                    text="Build with confidence."
                                    speed={60}
                                    delay={500}
                                />
                            </span>
                            <span className="md:hidden">
                                Build with confidence.
                            </span>
                        </h1>
                    </AnimatedHeadline>

                    <AnimatedHeadline delay={0.4}>
                        <p className="mt-6 text-lg md:text-xl text-security-text max-w-2xl leading-relaxed">
                            Developer tools for security-conscious teams.
                            Local-first processing, source transparency, and
                            zero data collection.
                        </p>
                    </AnimatedHeadline>

                    <AnimatedHeadline delay={0.6}>
                        <div className="mt-8">
                            <TrustBadges />
                        </div>
                    </AnimatedHeadline>

                    <AnimatedHeadline delay={0.8}>
                        <div className="mt-10 flex flex-wrap items-center gap-4">
                            <Link
                                href="#products"
                                className="inline-flex items-center px-6 py-3 font-mono text-sm bg-accent text-security-black rounded-md hover:bg-accent-dim transition-all hover:shadow-glow"
                            >
                                Explore Tools
                                <span className="ml-2">↓</span>
                            </Link>
                            <a
                                href="https://github.com/darraghoriordan"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 font-mono text-sm text-security-light border border-security-border rounded-md hover:border-accent/50 hover:text-accent transition-all"
                            >
                                <GitHubIcon className="h-4 w-4 fill-current" />
                                View on GitHub
                            </a>
                        </div>
                    </AnimatedHeadline>
                </div>

                {/* Terminal Demo */}
                <FadeInOnScroll
                    delay={0.2}
                    className="mt-16 md:mt-24 max-w-3xl"
                >
                    <TerminalWindow title="~/projects">
                        <TerminalPrompt
                            command="pnpm run mill:init"
                            output={`[OK] Terraform Synced
[OK] Dependencies installed
[OK] Stripe configured
[OK] Organization setup complete
[OK] Ready for development`}
                        />
                    </TerminalWindow>
                </FadeInOnScroll>

                {/* Products Section */}
                <section id="products" className="mt-24 md:mt-32">
                    <FadeInOnScroll>
                        <div className="flex items-center gap-4 mb-12">
                            <h2 className="font-display text-2xl md:text-3xl text-security-light">
                                Products
                            </h2>
                            <div className="h-px flex-1 bg-security-border" />
                        </div>
                    </FadeInOnScroll>

                    <StaggerContainer className="space-y-8" staggerDelay={0.15}>
                        {products.map((product) => (
                            <StaggerItem key={product.title}>
                                <SingleProductCard {...product} />
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </section>

                {/* Open Source Section - Free & Open Source */}
                <OpenSourceSection />
            </Container>
        </div>
    );
}
