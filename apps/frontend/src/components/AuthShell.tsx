import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "./Container";

export function AuthShell({
    eyebrow,
    title,
    description,
    children,
    footer,
}: {
    eyebrow: string;
    title: string;
    description: string;
    children: ReactNode;
    footer: ReactNode;
}) {
    return (
        <main className="auth-grid min-h-screen bg-security-black text-security-light">
            <Container className="relative flex min-h-screen items-center py-12">
                <div className="grid w-full items-center gap-12 lg:grid-cols-[minmax(0,1fr)_30rem]">
                    <section className="hidden max-w-xl lg:block">
                        <Link
                            href="/"
                            className="font-mono text-sm text-accent transition-colors hover:text-accent-dim"
                        >
                            {">"} MILLER_
                        </Link>
                        <p className="mt-16 font-mono text-xs uppercase tracking-[0.28em] text-security-muted">
                            Application access
                        </p>
                        <h2 className="mt-5 text-5xl font-semibold leading-[1.04] tracking-tight text-white">
                            Your app account now belongs to your app.
                        </h2>
                        <p className="mt-6 max-w-lg text-lg leading-8 text-security-text">
                            Sessions, identities, and account recovery run on
                            Miller&apos;s own infrastructure. No hosted identity
                            dashboard sits between you and your users.
                        </p>
                        <div className="mt-10 flex items-center gap-3 font-mono text-xs text-security-muted">
                            <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_18px_var(--color-accent)]" />
                            POSTGRES-BACKED · REVOCABLE · PORTABLE
                        </div>
                    </section>

                    <section className="relative overflow-hidden rounded-2xl border border-security-border bg-security-dark/95 p-6 shadow-terminal sm:p-10">
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
                        <div className="flex items-center justify-between gap-4">
                            <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">
                                {eyebrow}
                            </p>
                            <Link
                                href="/"
                                className="shrink-0 font-mono text-xs text-security-muted transition-colors hover:text-accent focus-visible:text-accent focus-visible:outline-none"
                            >
                                <span aria-hidden="true">&larr;</span> Home
                            </Link>
                        </div>
                        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white">
                            {title}
                        </h1>
                        <p className="mt-3 leading-7 text-security-text">
                            {description}
                        </p>
                        <div className="mt-8">{children}</div>
                        <div className="mt-8 border-t border-security-border pt-6 text-sm text-security-muted">
                            {footer}
                        </div>
                    </section>
                </div>
            </Container>
        </main>
    );
}

export const authInputClassName =
    "mt-2 block w-full rounded-lg border border-security-border bg-security-black px-4 py-3 text-security-light outline-none transition placeholder:text-security-muted focus:border-accent focus:ring-2 focus:ring-accent/15";

export const authButtonClassName =
    "inline-flex w-full items-center justify-center rounded-lg bg-accent px-4 py-3 font-mono text-sm font-semibold text-security-black transition hover:bg-accent-dim disabled:cursor-not-allowed disabled:opacity-50";
