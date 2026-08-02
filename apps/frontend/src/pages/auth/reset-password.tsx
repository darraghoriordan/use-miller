import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
    AuthShell,
    authButtonClassName,
    authInputClassName,
} from "../../components/AuthShell";
import { authClient } from "../../lib/auth-client";

export default function ResetPasswordPage() {
    const router = useRouter();
    const token = Array.isArray(router.query.token)
        ? router.query.token[0]
        : router.query.token;
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isComplete, setIsComplete] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!token) {
            setError("This reset link is missing its token.");
            return;
        }
        setIsSubmitting(true);
        const result = await authClient.resetPassword({
            newPassword: password,
            token,
        });
        setIsSubmitting(false);
        if (result.error) {
            setError(result.error.message ?? "Unable to reset password");
            return;
        }
        setIsComplete(true);
    }

    return (
        <AuthShell
            eyebrow="Account recovery"
            title="Choose a new password"
            description="Completing this reset revokes your other active sessions."
            footer={
                <Link href="/auth/login" className="text-accent">
                    Return to sign in
                </Link>
            }
        >
            {isComplete ? (
                <p role="status" className="text-sm text-accent">
                    Password updated. You can now sign in.
                </p>
            ) : (
                <form onSubmit={submit} className="space-y-5">
                    <label className="block text-sm text-security-text">
                        New password
                        <input
                            type="password"
                            autoComplete="new-password"
                            minLength={10}
                            maxLength={128}
                            required
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            className={authInputClassName}
                        />
                    </label>
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
                        {isSubmitting ? "Updating…" : "Update password"}
                    </button>
                </form>
            )}
        </AuthShell>
    );
}
