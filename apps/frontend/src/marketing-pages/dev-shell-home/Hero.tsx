"use client";

import StyledLink from "../../components/StyledLink";
import { Container } from "../../components/Container";
import { CheckIcon } from "@heroicons/react/24/outline";
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
import { SecurityBadge } from "../../components/SecurityBadge";
import type { components } from "../../shared/types/api-specs";

type UserDto = components["schemas"]["UserDto"];

export function Hero({ user }: { user: UserDto }) {
    const features = [
        "Well tested, re-runnable shell scripts that install everything a developer needs",
        "All tools configured to be available on Mac and Windows WSL Ubuntu where possible",
        "Near-instant searching on the CLI with fzf",
        "Great developer settings for your global git and npm configurations",
        "Install all the tools you need from brew during setup, use my list or edit to suit your own needs",
        "Dot files with all of the configuration I use for development",
        "Pre configured, git-aware terminal commands like ls (using exa), git and code syntax highlighting aware cat (using bat)",
        "A beautiful shell prompt (Pure prompt)",
        "Clean developer fonts from HackerFonts installed on Windows and Mac",
        "Clone all of your repositories to a new computer during setup",
        "Synchronise environment changes on all your computers with a simple command",
        "Get the full source - you can place these in a git repo and edit to suit your needs",
        "VSCode configuration which has many improvements and common extensions to make your life easier",
        "Own the scripts forever - you get the source and I keep the scripts updated",
    ];

    const topFeatures = [
        {
            name: "All your packages installed",
            description:
                "All your tools installed via homebrew (Mac) or Apt (Windows WSL). Antigen is pre-configured to manage your zsh plugins.",
        },
        {
            name: "VSCode pre-configured",
            description:
                "Installs vscode, configures sensible settings and installs common extensions (eslint, prettier, tailwind, spell checker, xml and more)",
        },
        {
            name: "Global developer config",
            description:
                "Sensible global git ignores, git config, git aliases, npmrc, zsh aliases and more. Auto-detect flutter, dotnet, miniconda and add to PATH.",
        },
        {
            name: "Consistency for Mac and Windows",
            description:
                "Installs zsh to WSL, adds beautiful tools and fonts to match the Mac experience. Aliases commands to match Mac.",
        },
        {
            name: "Annoying new Mac setup - gone",
            description:
                "All text files on mac associated with VSCode, 'smart quotes' disabled, DS_Store files disabled where possible and more.",
        },
        {
            name: "Full control for you",
            description:
                "Get access to the source code in GitHub so you can edit to suit your needs. Delete parts you don't need and add what you use.",
        },
    ];

    const codeHref = `docs/dev-shell/reference/dev-shell-scripts/${btoa("/README.md")}`;
    const docsHref = `/docs/dev-shell/get-started/quick-start`;

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
                            <span className="font-mono text-sm text-product-devshell uppercase tracking-wider">
                                Developer Environment
                            </span>
                        </div>
                    </AnimatedHeadline>

                    <AnimatedHeadline delay={0.2}>
                        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-security-light leading-tight tracking-tight">
                            Your full dev environment configured with one
                            command
                        </h1>
                    </AnimatedHeadline>

                    <AnimatedHeadline delay={0.4}>
                        <p className="mt-6 text-lg md:text-xl text-security-text max-w-2xl leading-relaxed">
                            Save 30+ hours configuring your development
                            environment. Specifically designed to give you the
                            same shell experience on Mac and Windows.
                        </p>
                    </AnimatedHeadline>

                    <AnimatedHeadline delay={0.5}>
                        <div className="mt-6 flex flex-wrap items-center gap-3">
                            <SecurityBadge icon="terminal" variant="accent">
                                Reproducible Setup
                            </SecurityBadge>
                            <SecurityBadge icon="shield" variant="accent">
                                Production Config
                            </SecurityBadge>
                            <SecurityBadge icon="code" variant="accent">
                                Mac + Windows
                            </SecurityBadge>
                        </div>
                    </AnimatedHeadline>

                    <AnimatedHeadline delay={0.6}>
                        <div className="mt-8 flex flex-wrap items-center gap-4">
                            <StyledLink
                                href="#pricing"
                                color="devshell"
                                className="text-base px-8 py-3"
                            >
                                Buy DevShell
                            </StyledLink>
                            <StyledLink
                                href={docsHref}
                                color="devshell"
                                variant="outline"
                                className="text-base px-8 py-3"
                            >
                                Read the docs
                            </StyledLink>
                            <StyledLink
                                href={codeHref}
                                color="devshell"
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
                    <TerminalWindow title="~/devshell">
                        <TerminalPrompt
                            command="./setup.sh"
                            output={`[DETECT] macOS detected
[INSTALL] Installing homebrew packages...
[CONFIG] Setting up zsh + antigen...
[CONFIG] Configuring git, npm, vscode...
[CLONE] Cloning your repositories...
[DONE] Dev environment ready!`}
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
                                <div className="p-6 bg-security-dark border border-security-border rounded-lg hover:border-product-devshell/50 transition-colors">
                                    <div className="flex items-start gap-3">
                                        <CheckIcon className="h-5 w-5 text-product-devshell flex-shrink-0 mt-0.5" />
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

                {/* YouTube Demo Section */}
                <FadeInOnScroll className="mt-24">
                    <div className="max-w-3xl">
                        <h2 className="font-display text-2xl md:text-3xl text-security-light mb-6">
                            Setup your full Dev Env in minutes
                        </h2>
                        <p className="text-security-text mb-4">
                            DevShell scripts will detect your OS and configure
                            your shell, install your favourite packages, set
                            aliases, configure system settings, install vscode
                            settings and extensions, clone your repos and more.
                        </p>
                        <p className="text-security-text mb-8">
                            Preview what this experience looks like:
                        </p>
                        <div className="relative aspect-video rounded-lg overflow-hidden border border-security-border bg-security-dark">
                            <iframe
                                className="absolute inset-0 w-full h-full"
                                src="https://www.youtube.com/embed/laX7U9bc7rw"
                                title="Developer Shell setup script demo on MacOS"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </FadeInOnScroll>

                {/* What is DevShell */}
                <FadeInOnScroll className="mt-24">
                    <div className="max-w-3xl">
                        <h2 className="font-display text-2xl md:text-3xl text-security-light mb-6">
                            What is DevShell?
                        </h2>
                        <div className="space-y-4 text-security-text">
                            <p>
                                DevShell is a collection of well-tested scripts
                                for setting up and synchronising your shell
                                across all of your computers.
                            </p>
                            <p>
                                Have one source of truth for all your Macs and
                                PCs - consistent aliases, functions, preferred
                                packages and any other configuration.
                            </p>
                            <p>
                                DevShell also includes all the latest and
                                greatest terminal tooling to help a productive
                                developer. The windows tools are already aliased
                                to the mac commands so you can use the same
                                commands on both platforms.
                            </p>
                        </div>

                        <div className="mt-8">
                            <h3 className="font-display text-lg text-security-light mb-4">
                                DevShell focuses on four main things:
                            </h3>
                            <ul className="space-y-4 text-security-text">
                                <li className="flex items-start gap-3">
                                    <CheckIcon className="h-5 w-5 text-product-devshell flex-shrink-0 mt-0.5" />
                                    <span>
                                        <strong className="text-security-light">
                                            Fast setup.
                                        </strong>{" "}
                                        Save hours with DevShell. Call one
                                        script that gathers required parameters,
                                        detects the host OS and runs the
                                        appropriate commands.
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckIcon className="h-5 w-5 text-product-devshell flex-shrink-0 mt-0.5" />
                                    <span>
                                        <strong className="text-security-light">
                                            Champion modern tools.
                                        </strong>{" "}
                                        DevShell installs improved modern tools
                                        and aliases the commands for you. Git
                                        file status in your "ls" output, syntax
                                        highlighted "cat", near instant search
                                        with "fzf".
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckIcon className="h-5 w-5 text-product-devshell flex-shrink-0 mt-0.5" />
                                    <span>
                                        <strong className="text-security-light">
                                            Mac and Windows Support.
                                        </strong>{" "}
                                        DevShell ensures that the same aliases,
                                        tools, fonts and configuration are
                                        consistent on both platforms.
                                    </span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckIcon className="h-5 w-5 text-product-devshell flex-shrink-0 mt-0.5" />
                                    <span>
                                        <strong className="text-security-light">
                                            Open tooling.
                                        </strong>{" "}
                                        This is not a SaaS product. When you
                                        purchase DevShell you get the source
                                        code. You can modify it to your heart's
                                        content.
                                    </span>
                                </li>
                            </ul>
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
                                <CheckIcon className="h-4 w-4 text-product-devshell flex-shrink-0 mt-1" />
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
                            color="devshell"
                            className="text-base px-8 py-3"
                        >
                            Buy DevShell now
                        </StyledLink>
                        <StyledLink
                            href={docsHref}
                            color="devshell"
                            variant="outline"
                            className="text-base px-8 py-3"
                        >
                            Read the docs
                        </StyledLink>
                        <StyledLink
                            href={codeHref}
                            color="devshell"
                            variant="ghost"
                            className="text-base"
                        >
                            Preview code
                        </StyledLink>
                    </div>
                </FadeInOnScroll>

                {/* FAQ-style section */}
                <FadeInOnScroll className="mt-24">
                    <div className="max-w-3xl p-8 bg-security-dark border border-security-border rounded-lg">
                        <h3 className="font-display text-xl text-security-light mb-4">
                            "But I'm a developer, I could build this myself!?"
                        </h3>
                        <p className="text-security-text mb-4">
                            You absolutely could! It's a great project to learn
                            shell scripting if you'd like to do that. Check out{" "}
                            <a
                                className="text-product-devshell hover:underline"
                                href="https://www.darraghoriordan.com/2022/01/28/developer-shell-modern-bat-fzf-antigen-zsh-wsl-mac/"
                            >
                                my blog post
                            </a>{" "}
                            with some tips for shell tools if you're keen to
                            learn yourself.
                        </p>
                        <p className="text-security-text">
                            It will take 10-20 hours, at least, to build up all
                            the tools and config here so that's ~$3/hour. If you
                            just want to save time... DevShell is for you!
                        </p>
                    </div>
                </FadeInOnScroll>
            </Container>
        </div>
    );
}
