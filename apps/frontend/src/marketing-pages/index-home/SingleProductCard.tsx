"use client";

import Link from "next/link";
import clsx from "clsx";
import { HeroProduct } from "./Hero";
import { GitHubIcon } from "../../components/GithubIcon";
import { colorVariants } from "../../styles/themeColors";
import { GitHubStarsBadge } from "../../components/SecurityBadge";
import { CheckIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { GlowCard } from "../../components/Animations";

// Legacy export for backward compatibility
export const GithubLink = ({ githubUrl }: { githubUrl: string }) => {
    return (
        <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-security-text hover:text-accent transition-colors"
        >
            <GitHubIcon className="w-5 h-5 fill-current" />
            <span className="font-mono text-sm">View on GitHub</span>
        </a>
    );
};

export const SingleProductCard = ({
    colorVariant,
    title,
    blurb,
    benefits,
    learnMoreLinkUrl,
    learnMoreLinkText,
    altLinkText,
    altLink,
    githubUrl,
    stars,
}: HeroProduct) => {
    return (
        <GlowCard className="p-6 md:p-8 group">
            <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-8">
                {/* Left side - Title and description */}
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                        <h3
                            className={clsx(
                                "font-display text-xl md:text-2xl",
                                colorVariants[colorVariant].foreground,
                            )}
                        >
                            {title}
                        </h3>
                        {stars && <GitHubStarsBadge stars={stars} />}
                    </div>

                    <p className="text-security-text text-lg mb-6">{blurb}</p>

                    {/* Benefits list */}
                    <ul className="space-y-2 mb-6">
                        {benefits.map((benefit, i) => (
                            <li
                                key={i}
                                className="flex items-start gap-2 text-sm text-security-text"
                            >
                                <CheckIcon
                                    className={clsx(
                                        "h-4 w-4 mt-0.5 flex-shrink-0",
                                        colorVariants[colorVariant].foreground,
                                    )}
                                />
                                <span>{benefit}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Action links */}
                    <div className="flex flex-wrap items-center gap-3">
                        <Link
                            href={learnMoreLinkUrl}
                            className={clsx(
                                "inline-flex items-center gap-2 px-5 py-2.5 font-mono text-sm rounded-md transition-all",
                                colorVariants[colorVariant].background,
                                "text-security-black",
                                colorVariants[colorVariant].hoverGlow,
                            )}
                        >
                            {learnMoreLinkText}
                            <ArrowRightIcon className="h-4 w-4" />
                        </Link>

                        <Link
                            href={altLink}
                            className="inline-flex items-center gap-2 px-5 py-2.5 font-mono text-sm text-security-text border border-security-border rounded-md hover:border-accent/50 hover:text-accent transition-all"
                        >
                            {altLinkText}
                        </Link>

                        {githubUrl && (
                            <a
                                href={githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2.5 font-mono text-sm text-security-muted hover:text-security-light transition-colors"
                            >
                                <GitHubIcon className="h-4 w-4 fill-current" />
                                <span className="hidden sm:inline">GitHub</span>
                            </a>
                        )}
                    </div>
                </div>

                {/* Right side - Terminal snippet */}
                <div className="md:w-72 lg:w-80 flex-shrink-0">
                    <div className="bg-security-darker rounded-lg border border-security-border overflow-hidden">
                        <div className="flex items-center gap-1.5 px-3 py-2 bg-security-dark border-b border-security-border">
                            <div className="w-2 h-2 rounded-full bg-red-500/60" />
                            <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                            <div className="w-2 h-2 rounded-full bg-green-500/60" />
                        </div>
                        <div className="p-4">
                            <div className="font-mono text-xs">
                                <span className="text-security-muted">$</span>{" "}
                                <span className="text-accent">
                                    {title === "Dev Shell" &&
                                        "./sharedSetup.sh --install"}
                                    {title === "Local Dev Tools" &&
                                        "open -a LocalDevTools.app"}
                                    {title === "Miller Start" &&
                                        "pnpm run mill:init"}
                                </span>
                            </div>
                            <div className="mt-2 font-mono text-xs text-security-muted">
                                {title === "Dev Shell" && (
                                    <>
                                        <div>[OK] Detecting OS...</div>
                                        <div>[OK] Installing packages...</div>
                                        <div>[OK] Configuring shell...</div>
                                        <div className="text-accent">
                                            [DONE] Shell Ready!
                                        </div>
                                    </>
                                )}
                                {title === "Local Dev Tools" && (
                                    <>
                                        <div>[OK] Loading utilities...</div>
                                        <div>[OK] No network required</div>
                                        <div className="text-accent">
                                            [DONE] Running locally
                                        </div>
                                    </>
                                )}
                                {title === "Miller Start" && (
                                    <>
                                        <div>[OK] Syncing terraform...</div>
                                        <div>[OK] Installing deps...</div>
                                        <div>[OK] Configuring stripe...</div>
                                        <div className="text-accent">
                                            [DONE] Project ready!
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GlowCard>
    );
};
