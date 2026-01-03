import Link from "next/link";
import { Container } from "./Container";
import { GitHubIcon } from "./GithubIcon";

export function Footer({
    productKey,
    headerTitle,
}: {
    productKey?: string;
    headerTitle?: string;
}) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-security-border/50 bg-security-darker">
            <Container>
                <div className="py-8 md:py-12">
                    {/* Main footer content */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        {/* Brand and author */}
                        <div className="flex flex-col gap-2">
                            <Link
                                href="/"
                                className="font-mono text-lg text-security-light hover:text-accent transition-colors"
                            >
                                <span className="text-accent">{">"}</span>{" "}
                                {headerTitle || "MILLER_"}
                            </Link>
                            <p className="text-sm text-security-muted">
                                Built by{" "}
                                <Link
                                    href="/about"
                                    className="text-security-text hover:text-accent transition-colors"
                                >
                                    Darragh O'Riordan
                                </Link>
                            </p>
                        </div>

                        {/* Links */}
                        <div className="flex flex-wrap items-center gap-6 text-sm">
                            {productKey && (
                                <>
                                    <Link
                                        href={`/${productKey}/#features`}
                                        className="font-mono text-security-text hover:text-accent transition-colors"
                                    >
                                        Features
                                    </Link>
                                    <Link
                                        href={`/${productKey}/#pricing`}
                                        className="font-mono text-security-text hover:text-accent transition-colors"
                                    >
                                        Pricing
                                    </Link>
                                    <Link
                                        href={`/docs/${productKey}/get-started/quick-start`}
                                        className="font-mono text-security-text hover:text-accent transition-colors"
                                    >
                                        Docs
                                    </Link>
                                    <span className="text-security-border">
                                        |
                                    </span>
                                </>
                            )}
                            <a
                                href="https://github.com/darraghoriordan"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-security-text hover:text-accent transition-colors"
                            >
                                <GitHubIcon className="h-4 w-4 fill-current" />
                                <span className="font-mono">GitHub</span>
                            </a>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="mt-8 pt-6 border-t border-security-border/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <p className="font-mono text-xs text-security-muted">
                            &copy; {currentYear} Miller Dev Tools. All rights
                            reserved.
                        </p>
                        <div className="flex items-center gap-6 text-xs">
                            <Link
                                href="/terms"
                                className="font-mono text-security-muted hover:text-security-text transition-colors"
                            >
                                Terms
                            </Link>
                            <Link
                                href="/privacy"
                                className="font-mono text-security-muted hover:text-security-text transition-colors"
                            >
                                Privacy
                            </Link>
                            <Link
                                href="/about"
                                className="font-mono text-security-muted hover:text-security-text transition-colors"
                            >
                                About
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
