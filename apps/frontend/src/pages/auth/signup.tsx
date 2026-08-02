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

export default function SignupPage() {
    const router = useRouter();
    const returnTo = safeReturnTo(router.query.returnTo);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);
        setMessage(null);
        setIsSubmitting(true);
        const callbackURL = new URL(
            returnTo,
            window.location.origin,
        ).toString();
        const result = await authClient.signUp.email({
            name,
            email,
            password,
            callbackURL,
        });
        setIsSubmitting(false);
        if (result.error) {
            setError(result.error.message ?? "Unable to create account");
            return;
        }
        if (!result.data?.token) {
            setMessage("Check your inbox to verify your email, then sign in.");
            return;
        }
        await router.push(returnTo);
    }

    return (
        <AuthShell
            eyebrow="Own your account"
            title="Create your Miller account"
            description="Start with email and password. Add social sign-in when your app needs it."
            footer={
                <>
                    Already have an account?{" "}
                    <Link
                        href={`/auth/login?returnTo=${encodeURIComponent(returnTo)}`}
                        className="text-accent hover:text-accent-dim"
                    >
                        Sign in
                    </Link>
                </>
            }
        >
            <form onSubmit={submit} className="space-y-5">
                <label className="block text-sm text-security-text">
                    Name
                    <input
                        type="text"
                        autoComplete="name"
                        required
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        className={authInputClassName}
                    />
                </label>
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
                        autoComplete="new-password"
                        minLength={10}
                        maxLength={128}
                        required
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className={authInputClassName}
                    />
                    <span className="mt-2 block text-xs text-security-muted">
                        Use at least 10 characters.
                    </span>
                </label>
                {error && (
                    <p role="alert" className="text-sm text-red-300">
                        {error}
                    </p>
                )}
                {message && (
                    <p role="status" className="text-sm text-accent">
                        {message}
                    </p>
                )}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={authButtonClassName}
                >
                    {isSubmitting ? "Creating account…" : "Create account"}
                </button>
            </form>
        </AuthShell>
    );
}
