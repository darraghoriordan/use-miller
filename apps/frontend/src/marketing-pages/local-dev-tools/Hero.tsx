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
import { AppWindow } from "../../components/AppWindow";
import { JwtDecoderDemo } from "./JwtDecoderDemo";
import { SecurityBadge } from "../../components/SecurityBadge";
import { useLocalDevToolsVersion } from "../../hooks/useLocalDevToolsVersion";
import type { components } from "../../shared/types/api-specs";

type UserDto = components["schemas"]["UserDto"];

const FALLBACK_VERSION = "1.74.4";

const getDownloadUrls = (version: string) => ({
    winArm64: `https://assets.darraghoriordan.com/localDevTools/gr-hosting/${version}/LocalDevTools-${version}-arm64.exe`,
    macArm64: `https://assets.darraghoriordan.com/localDevTools/gr-hosting/${version}/LocalDevTools-${version}-arm64.dmg`,
    macX64: `https://assets.darraghoriordan.com/localDevTools/gr-hosting/${version}/LocalDevTools-${version}-x64.dmg`,
    winX64: `https://assets.darraghoriordan.com/localDevTools/gr-hosting/${version}/LocalDevTools-${version}-x64.exe`,
});

export function Hero({ user }: { user: UserDto }) {
    const { version: fetchedVersion } = useLocalDevToolsVersion();
    const version = fetchedVersion || FALLBACK_VERSION;
    const downloadUrls = getDownloadUrls(version);
    const features = [
        "Offline encoding and decoding tools for base64, JWT and JSON",
        "Use local AI models in tools built specifically for developers",
        "Save $1000's with an AI powered Marketing tool for builders and busy engineers",
        "A color converter with 'nearest tailwind color' and harmonious colors feature",
        "Encoders and decoders for Html and CSS Unicode characters, uri components",
        "A git url parser and generator that is aware of your local ssh aliases",
        "A git repo summary tool to verify user name is consistent across ssh alias related repos (work vs personal)",
        "A tool to quickly parse and map timestamps in different formats, local and UTC",
        "String tools - A case converter and an internationalisation aware string sorter",
    ];

    const topFeatures = [
        {
            name: "All your dev tools in one place",
            description:
                "Encoders, decoders, tailwind colors, git repository tools, time wrangling tools, string tools and more. All in one place.",
        },
        {
            name: "Powerful Local AI tools",
            description:
                "Our AI tools support any local LM Studio models, or bring your own AI API key",
        },
        {
            name: "Universal license",
            description:
                "Buy a licence and use the tool on all your Mac and Windows machines.",
        },
        {
            name: "Shared source",
            description:
                "Dev tools is shared source, purchasers can view and contribute on GitHub.",
        },
    ];

    const docsHref = `/docs/local-dev-tools/get-started/quick-start`;

    return (
        <div className="relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 bg-grid opacity-30" />
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-security-black" />
            <ScanLine />

            <Container className="relative pt-16 md:pt-24 pb-16">
                {/* Hero Section */}
                <div className="max-w-4xl">
                    <AnimatedHeadline delay={0.1}>
                        <div className="mb-6 flex items-center gap-3">
                            <span className="font-mono text-sm text-product-localtools uppercase tracking-wider">
                                Offline Utilities
                            </span>
                        </div>
                    </AnimatedHeadline>

                    <AnimatedHeadline delay={0.2}>
                        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-security-light leading-tight tracking-tight">
                            Control your data with local dev utilities
                        </h1>
                    </AnimatedHeadline>

                    <AnimatedHeadline delay={0.4}>
                        <p className="mt-6 text-lg md:text-xl text-security-text max-w-2xl leading-relaxed">
                            Offline utilities for developers. Keep your business
                            data safe and local. No data leaves your machine.
                        </p>
                    </AnimatedHeadline>

                    <AnimatedHeadline delay={0.5}>
                        <div className="mt-6 flex flex-wrap items-center gap-3">
                            <SecurityBadge icon="lock" variant="accent">
                                100% Offline AI Powered Dev Utilities
                            </SecurityBadge>
                            <SecurityBadge icon="shield" variant="accent">
                                Data Never Leaves Your Machine
                            </SecurityBadge>
                            <SecurityBadge icon="code" variant="accent">
                                Source is Shared
                            </SecurityBadge>
                        </div>
                    </AnimatedHeadline>

                    {/* <AnimatedHeadline delay={0.6}>
                        <div className="mt-8">
                            <GithubLink githubUrl="https://github.com/darraghoriordan/ssh-tool-new-electron" />
                        </div>
                    </AnimatedHeadline> */}

                    <AnimatedHeadline delay={0.7}>
                        <div className="mt-8 flex flex-wrap items-center gap-4">
                            <StyledLink
                                href="#download"
                                color="localtools"
                                className="text-base px-8 py-3"
                            >
                                Try for free
                            </StyledLink>
                            <StyledLink
                                href={docsHref}
                                color="localtools"
                                variant="outline"
                                className="text-base px-8 py-3"
                            >
                                Read the docs
                            </StyledLink>
                        </div>
                    </AnimatedHeadline>
                </div>

                {/* App Demo */}
                <FadeInOnScroll
                    delay={0.2}
                    className="mt-16 md:mt-20 max-w-2xl"
                >
                    <AppWindow title="Local Dev Tools">
                        <JwtDecoderDemo />
                    </AppWindow>
                </FadeInOnScroll>

                {/* Features Grid */}
                <section id="features" className="mt-24 md:mt-32">
                    <FadeInOnScroll>
                        <h2 className="font-display text-2xl md:text-3xl text-security-light mb-12">
                            What's included
                        </h2>
                    </FadeInOnScroll>

                    <StaggerContainer
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        staggerDelay={0.1}
                    >
                        {topFeatures.map((feature) => (
                            <StaggerItem key={feature.name}>
                                <div className="p-6 bg-security-dark border border-security-border rounded-lg hover:border-product-localtools/50 transition-colors">
                                    <div className="flex items-start gap-3">
                                        <CheckIcon className="h-5 w-5 text-product-localtools flex-shrink-0 mt-0.5" />
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

                {/* What is Local Dev Tools */}
                <FadeInOnScroll className="mt-24">
                    <div className="max-w-3xl">
                        <h2 className="font-display text-2xl md:text-3xl text-security-light mb-6">
                            What are Local Dev Tools?
                        </h2>
                        <div className="space-y-4 text-security-text">
                            <p>
                                Local dev tools are a collection of safe,
                                offline utilities for developers. You can paste
                                in your company's or client's data safely into
                                tools for tasks like JWT decoding, list sorting
                                and uri encoding.
                            </p>
                            <p>
                                The tools work offline so you can use your
                                business data with confidence rather than using
                                random websites or sending your data to AI
                                companies. The tools work on both Mac and
                                Windows.
                            </p>
                            <p>
                                We support offline, secure local AI with LM
                                studio. If you chose to, you can use your own
                                API keys for cloud AI (e.g. OpenAI/Google) and
                                never transmit data to a UseMiller server.
                            </p>
                        </div>
                    </div>
                </FadeInOnScroll>

                {/* Download Section */}
                <FadeInOnScroll className="mt-24" id="download">
                    <h2 className="font-display text-2xl md:text-3xl text-security-light mb-6">
                        Download Local Dev Tools (v{version})
                    </h2>
                    <p className="text-security-text mb-8">
                        Download for free Trial. Buy a license later if you find
                        it useful. Source available{" "}
                        <a
                            className="text-product-localtools hover:underline"
                            href="https://github.com/darraghoriordan/ssh-tool-new-electron"
                        >
                            on Github
                        </a>
                        .
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Mac Downloads */}
                        <div className="p-6 bg-security-dark border border-security-border rounded-lg">
                            <h3 className="font-display text-xl text-security-light mb-6 flex items-center gap-2">
                                <svg
                                    className="w-5 h-5"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                                </svg>
                                Mac
                            </h3>
                            <div className="space-y-4">
                                <a
                                    href={downloadUrls.macArm64}
                                    className="flex items-center justify-between p-4 border border-security-border rounded-lg hover:border-product-localtools/50 hover:bg-security-dark/50 transition-colors group"
                                >
                                    <div>
                                        <div className="text-security-light font-medium">
                                            Apple Silicon (Arm64)
                                        </div>
                                        <div className="text-sm text-security-muted">
                                            M1/M2/M3 Macs
                                        </div>
                                    </div>
                                    <SecurityBadge
                                        icon="download"
                                        variant="accent"
                                    >
                                        .dmg
                                    </SecurityBadge>
                                </a>
                                <a
                                    href={downloadUrls.macX64}
                                    className="flex items-center justify-between p-4 border border-security-border rounded-lg hover:border-product-localtools/50 hover:bg-security-dark/50 transition-colors group"
                                >
                                    <div>
                                        <div className="text-security-light font-medium">
                                            Intel x64
                                        </div>
                                        <div className="text-sm text-security-muted">
                                            Older Intel Macs
                                        </div>
                                    </div>
                                    <SecurityBadge
                                        icon="download"
                                        variant="accent"
                                    >
                                        .dmg
                                    </SecurityBadge>
                                </a>
                            </div>
                        </div>

                        {/* Windows Downloads */}
                        <div className="p-6 bg-security-dark border border-security-border rounded-lg">
                            <h3 className="font-display text-xl text-security-light mb-6 flex items-center gap-2">
                                <svg
                                    className="w-5 h-5"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M3 12V6.75l6-1.32v6.48L3 12zm17-9v8.75l-10 .15V5.21L20 3zM3 13l6 .09v6.81l-6-1.15V13zm17 .25V22l-10-1.91V13.1l10 .15z" />
                                </svg>
                                Windows
                            </h3>
                            <div className="space-y-4">
                                <a
                                    href={downloadUrls.winX64}
                                    className="flex items-center justify-between p-4 border border-security-border rounded-lg hover:border-product-localtools/50 hover:bg-security-dark/50 transition-colors group"
                                >
                                    <div>
                                        <div className="text-security-light font-medium">
                                            Intel x64
                                        </div>
                                        <div className="text-sm text-security-muted">
                                            Most Windows PCs
                                        </div>
                                    </div>
                                    <SecurityBadge
                                        icon="download"
                                        variant="accent"
                                    >
                                        .exe
                                    </SecurityBadge>
                                </a>
                                <a
                                    href={downloadUrls.winArm64}
                                    className="flex items-center justify-between p-4 border border-security-border rounded-lg hover:border-product-localtools/50 hover:bg-security-dark/50 transition-colors group"
                                >
                                    <div>
                                        <div className="text-security-light font-medium">
                                            Arm64
                                        </div>
                                        <div className="text-sm text-security-muted">
                                            ARM-based Windows
                                        </div>
                                    </div>
                                    <SecurityBadge
                                        icon="download"
                                        variant="accent"
                                    >
                                        .exe
                                    </SecurityBadge>
                                </a>
                            </div>
                        </div>
                    </div>
                </FadeInOnScroll>

                {/* Full Features List */}
                <FadeInOnScroll className="mt-24">
                    <h2 className="font-display text-2xl md:text-3xl text-security-light mb-8">
                        Everything you get
                    </h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {features.map((feature, i) => (
                            <li
                                key={i}
                                className="flex items-start gap-2 text-security-text"
                            >
                                <CheckIcon className="h-4 w-4 text-product-localtools flex-shrink-0 mt-1" />
                                <span className="text-sm">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </FadeInOnScroll>

                {/* CTA */}
                <FadeInOnScroll className="mt-16">
                    <div className="flex flex-wrap items-center gap-4">
                        <StyledLink
                            href="/local-dev-tools/#pricing"
                            color="localtools"
                            className="text-base px-8 py-3"
                        >
                            Buy once, use forever
                        </StyledLink>
                        <StyledLink
                            href={docsHref}
                            color="localtools"
                            variant="outline"
                            className="text-base px-8 py-3"
                        >
                            View the docs
                        </StyledLink>
                    </div>
                </FadeInOnScroll>
            </Container>
        </div>
    );
}
