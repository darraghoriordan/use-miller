"use client";

import { FadeInOnScroll } from "../../components/Animations";
import {
    GitHubStarsBadge,
    SecurityBadge,
} from "../../components/SecurityBadge";
import { TerminalWindow } from "../../components/TerminalWindow";
import { GitHubIcon } from "../../components/GithubIcon";
import {
    ShieldCheckIcon,
    CheckCircleIcon,
    CodeBracketIcon,
} from "@heroicons/react/24/outline";

const features = [
    "Dependency Injection validation",
    "Swagger/OpenAPI enforcement",
    "Security best practices",
    "CVE prevention rules",
    "Auto-fixable issues",
    "TypeScript support",
];

export function EslintPluginSection() {
    return (
        <section className="mt-24 md:mt-32">
            <FadeInOnScroll>
                <div className="flex items-center gap-4 mb-8">
                    <span className="font-mono text-sm text-product-eslint uppercase tracking-wider">
                        Free & Open Source
                    </span>
                    <div className="h-px flex-1 bg-security-border" />
                </div>
            </FadeInOnScroll>

            <FadeInOnScroll delay={0.1}>
                <TerminalWindow
                    title="eslint-plugin-nestjs-typed"
                    className="border-product-eslint/30 hover:border-product-eslint/50 transition-colors"
                >
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
                        {/* Content */}
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-4">
                                <ShieldCheckIcon className="h-8 w-8 text-product-eslint" />
                                <h3 className="font-display text-2xl md:text-3xl text-security-light">
                                    ESLint Plugin for NestJS
                                </h3>
                            </div>

                            <p className="text-security-text text-lg mb-6 max-w-xl">
                                Catch security issues and common bugs at lint
                                time. Trusted by thousands of NestJS developers
                                worldwide.
                            </p>

                            <div className="flex flex-wrap items-center gap-3 mb-8">
                                <GitHubStarsBadge stars={215} />
                                <SecurityBadge icon="users">
                                    30+ Contributors
                                </SecurityBadge>
                                <SecurityBadge icon="code">
                                    20+ Rules
                                </SecurityBadge>
                            </div>

                            {/* Feature grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                                {features.map((feature) => (
                                    <div
                                        key={feature}
                                        className="flex items-center gap-2 text-sm text-security-text"
                                    >
                                        <CheckCircleIcon className="h-4 w-4 text-product-eslint flex-shrink-0" />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA buttons */}
                            <div className="flex flex-wrap items-center gap-4">
                                <a
                                    href="https://github.com/darraghoriordan/eslint-plugin-nestjs-typed"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 font-mono text-sm bg-product-eslint text-security-black rounded-md hover:bg-product-eslint/80 transition-all"
                                >
                                    <GitHubIcon className="h-4 w-4 fill-current" />
                                    View on GitHub
                                </a>
                                <a
                                    href="https://www.npmjs.com/package/@darraghor/eslint-plugin-nestjs-typed"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 font-mono text-sm text-security-light border border-security-border rounded-md hover:border-product-eslint/50 hover:text-product-eslint transition-all"
                                >
                                    <CodeBracketIcon className="h-4 w-4" />
                                    npm install
                                </a>
                            </div>
                        </div>

                        {/* Code snippet */}
                        <div className="lg:w-80 flex-shrink-0">
                            <div className="bg-security-darker rounded-lg p-4 border border-security-border">
                                <div className="font-mono text-xs text-security-muted mb-2">
                                    # Install
                                </div>
                                <pre className="font-mono text-sm text-accent overflow-x-auto">
                                    <code>
                                        {`pnpm add -D \\
  @darraghor/eslint-plugin-nestjs-typed`}
                                    </code>
                                </pre>
                                <div className="font-mono text-xs text-security-muted mt-4 mb-2">
                                    # eslint.config.mjs
                                </div>
                                <pre className="font-mono text-xs text-security-text overflow-x-auto">
                                    <code>
                                        {`import nestjs from 
  "@darraghor/eslint-plugin-nestjs-typed";

export default [
  nestjs.configs.flatRecommended
];`}
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </div>
                </TerminalWindow>
            </FadeInOnScroll>
        </section>
    );
}
