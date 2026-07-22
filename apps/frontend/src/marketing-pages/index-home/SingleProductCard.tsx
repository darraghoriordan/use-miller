"use client";

import { GitHubIcon } from "../../components/GithubIcon";

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
