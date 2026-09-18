import { useState } from "react";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import StyledLink from "../../components/StyledLink";

const installCommand = "npx skills add darraghoriordan/localdevtools-skills -g";
const skillsUrl = "https://github.com/darraghoriordan/localdevtools-skills";

export function AiSkills() {
    const [copyStatus, setCopyStatus] = useState("");

    const copyInstallCommand = async () => {
        try {
            await navigator.clipboard.writeText(installCommand);
            setCopyStatus("Install command copied.");
        } catch {
            setCopyStatus(
                "Could not copy. Select the command above to copy it manually.",
            );
        }
    };

    return (
        <section
            id="ai-skills"
            aria-labelledby="ai-skills-title"
            className="mt-24 scroll-mt-24 border-y border-security-border py-12 md:mt-32 md:py-16"
        >
            <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
                <div className="min-w-0">
                    <h2
                        id="ai-skills-title"
                        className="font-display text-2xl text-security-light md:text-3xl"
                    >
                        Local tools for your AI agent
                    </h2>
                    <p className="mt-5 max-w-2xl leading-relaxed text-security-text">
                        Ask your agent to check a JWT, format JSON or convert a
                        timestamp. The Rust CLI reads your clipboard and runs
                        the tool on your computer, so you do not need to paste
                        the input into chat.
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-security-text">
                        Eight skills cover JWT, JSON, encoding, text, time,
                        colors, URLs and Git. Install them in agents that
                        support Agent Skills, including Claude Code and Codex.
                        The desktop app is optional.
                    </p>
                    <blockquote className="mt-6 font-display text-lg leading-relaxed text-security-light">
                        “Check whether the JWT on my clipboard has expired.”
                    </blockquote>
                    <p className="mt-4 text-sm leading-relaxed text-security-text">
                        Sensitive results stay in local files by default.
                        Requested findings and results you choose to share can
                        still enter the agent’s chat context.
                    </p>
                </div>
                <div className="min-w-0">
                    <h3 className="font-display text-xl text-security-light">
                        Install the skills
                    </h3>
                    <div className="mt-5 rounded-lg border border-security-border bg-security-dark p-5">
                        <pre className="whitespace-pre-wrap break-all font-mono text-sm leading-relaxed text-security-light">
                            <code>{installCommand}</code>
                        </pre>
                        <button
                            type="button"
                            onClick={copyInstallCommand}
                            className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-md bg-product-localtools px-4 py-2 font-mono text-sm font-medium text-security-black transition-colors hover:bg-product-localtools/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-product-localtools"
                        >
                            <ClipboardDocumentIcon
                                className="h-4 w-4"
                                aria-hidden="true"
                            />
                            Copy install command
                        </button>
                        <p
                            role="status"
                            className="mt-3 min-h-5 text-sm text-security-text"
                        >
                            {copyStatus}
                        </p>
                    </div>
                    <p className="mt-5 text-sm leading-relaxed text-security-text">
                        Then ask your agent to set up the LocalDevTools CLI.
                        Setup downloads a verified binary if needed; tool
                        commands run locally. Requires Node.js 20+ and a desktop
                        session for clipboard access. Available for macOS,
                        Windows and Linux on x64 and ARM64.
                    </p>
                    <StyledLink
                        href={skillsUrl}
                        color="localtools"
                        variant="outline"
                        className="mt-6"
                    >
                        View skills on GitHub
                    </StyledLink>
                </div>
            </div>
        </section>
    );
}
