"use client";

import { TerminalWindow } from "../../components/TerminalWindow";
import { GitHubIcon } from "../../components/GithubIcon";
import {
    GitHubStarsBadge,
    SecurityBadge,
} from "../../components/SecurityBadge";
import {
    ShieldCheckIcon,
    CubeIcon,
    CheckCircleIcon,
    CodeBracketIcon,
} from "@heroicons/react/24/outline";
import type { OssProject } from "./ossProjects";

const iconMap = {
    shield: ShieldCheckIcon,
    cube: CubeIcon,
} as const;

interface OssProjectCardProps {
    project: OssProject;
}

export function OssProjectCard({ project }: OssProjectCardProps) {
    const IconComponent = iconMap[project.iconType];

    return (
        <TerminalWindow
            title={project.terminalTitle}
            className="border-product-eslint/30 hover:border-product-eslint/50 transition-colors"
        >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
                {/* Content */}
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                        <IconComponent className="h-8 w-8 text-product-eslint" />
                        <h3 className="font-display text-2xl md:text-3xl text-security-light">
                            {project.displayName}
                        </h3>
                    </div>

                    <p className="text-security-text text-lg mb-6 max-w-xl">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 mb-8">
                        <GitHubStarsBadge stars={project.stats.stars} />
                        <SecurityBadge icon="users">
                            {project.stats.contributors}
                        </SecurityBadge>
                        <SecurityBadge icon="code">
                            {project.stats.extra}
                        </SecurityBadge>
                    </div>

                    {/* Feature grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                        {project.features.map((feature) => (
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
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 font-mono text-sm bg-product-eslint text-security-black rounded-md hover:bg-product-eslint/80 transition-all"
                        >
                            <GitHubIcon className="h-4 w-4 fill-current" />
                            View on GitHub
                        </a>
                        <a
                            href={project.links.npm}
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
                            <code>{project.installCommand}</code>
                        </pre>
                        <div className="font-mono text-xs text-security-muted mt-4 mb-2">
                            {project.codeExample.comment}
                        </div>
                        <pre className="font-mono text-[11px] text-security-text overflow-x-auto">
                            <code>{project.codeExample.code}</code>
                        </pre>
                    </div>
                </div>
            </div>
        </TerminalWindow>
    );
}
