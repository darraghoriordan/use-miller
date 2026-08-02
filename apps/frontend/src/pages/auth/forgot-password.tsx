import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
    AuthShell,
    authButtonClassName,
    authInputClassName,
} from "../../components/AuthShell";
import { authClient } from "../../lib/auth-client";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSent, setIsSent] = useState(false);

    async function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsSubmitting(true);
        await authClient.requestPasswordReset({
            email,
            redirectTo: `${window.location.origin}/auth/reset-password`,
        });
        setIsSubmitting(false);
        setIsSent(true);
    }

    return (
        <AuthShell
            eyebrow="Account recovery"
            title="Reset your password"
            description="We will send a one-time reset link if an account exists for this address."
            footer={
                <Link href="/auth/login" className="text-accent">
                    Return to sign in
                </Link>
            }
        >
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
                {isSent && (
                    <p role="status" className="text-sm text-accent">
                        Check your inbox for the reset link.
                    </p>
                )}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={authButtonClassName}
                >
                    {isSubmitting ? "Sending…" : "Send reset link"}
                </button>
            </form>
        </AuthShell>
    );
}
