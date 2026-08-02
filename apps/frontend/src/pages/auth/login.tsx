import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
    AuthShell,
    authButtonClassName,
    authInputClassName,
} from "../../components/AuthShell";
import { authClient } from "../../lib/auth-client";

function safeReturnTo(value: string | string[] | undefined): string {
    const candidate = Array.isArray(value) ? value[0] : value;
    return candidate?.startsWith("/") && !candidate.startsWith("//")
        ? candidate
        : "/dashboard";
}

export default function LoginPage() {
    const router = useRouter();
    const returnTo = safeReturnTo(router.query.returnTo);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);

    async function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);
        setIsSubmitting(true);
        const result = await authClient.signIn.email({ email, password });
        setIsSubmitting(false);
        if (result.error) {
            setError(result.error.message ?? "Unable to sign in");
            return;
        }
        await router.push(returnTo);
    }

    async function signInWithGoogle() {
        setError(null);
        setIsGoogleSubmitting(true);
        try {
            const frontendOrigin = window.location.origin;
            const result = await authClient.signIn.social({
                provider: "google",
                callbackURL: new URL(returnTo, frontendOrigin).toString(),
                errorCallbackURL: new URL(
                    "/auth/login?error=oauth",
                    frontendOrigin,
                ).toString(),
            });
            if (result.error) {
                setError(
                    result.error.message ?? "Unable to sign in with Google",
                );
                setIsGoogleSubmitting(false);
            }
        } catch {
            setError(
                "Unable to reach the authentication service. Check that the backend is running and try again.",
            );
            setIsGoogleSubmitting(false);
        }
    }

    return (
        <AuthShell
            eyebrow="Welcome back"
            title="Sign in to Miller"
            description="Continue to your projects, billing, and account settings."
            footer={
                <>
                    New here?{" "}
                    <Link
                        href={`/auth/signup?returnTo=${encodeURIComponent(returnTo)}`}
                        className="text-accent hover:text-accent-dim"
                    >
                        Create an account
                    </Link>
                </>
            }
        >
            {process.env.NEXT_PUBLIC_GOOGLE_AUTH_ENABLED === "true" && (
                <button
                    type="button"
                    onClick={signInWithGoogle}
                    disabled={isGoogleSubmitting}
                    className="mb-6 inline-flex w-full items-center justify-center rounded-lg border border-security-border bg-security-mid px-4 py-3 font-mono text-sm text-security-light transition hover:border-accent/50 hover:text-accent"
                >
                    {isGoogleSubmitting
                        ? "Connecting to Google…"
                        : "Continue with Google"}
                </button>
            )}
            <form onSubmit={submit} className="space-y-5">
                <label className="block text-sm text-security-text">
                    Email address
                    <input
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className={authInputClassName}
                    />
                </label>
                <label className="block text-sm text-security-text">
                    Password
                    <input
                        type="password"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className={authInputClassName}
                    />
                </label>
                <div className="flex justify-end">
                    <Link
                        href="/auth/forgot-password"
                        className="text-sm text-security-muted hover:text-accent"
                    >
                        Forgot password?
                    </Link>
                </div>
                {error && (
                    <p role="alert" className="text-sm text-red-300">
                        {error}
                    </p>
                )}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={authButtonClassName}
                >
                    {isSubmitting ? "Signing in…" : "Sign in"}
                </button>
            </form>
        </AuthShell>
    );
}
