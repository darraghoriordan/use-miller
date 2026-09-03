import { useState } from "react";
import { useRouter } from "next/router";
import { AuthShell, authButtonClassName } from "../../components/AuthShell";
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
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function signInWithGoogle() {
        setError(null);
        setIsSubmitting(true);
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
                setIsSubmitting(false);
            }
        } catch {
            setError(
                "Unable to reach the authentication service. Check that the backend is running and try again.",
            );
            setIsSubmitting(false);
        }
    }

    return (
        <AuthShell
            eyebrow="Welcome back"
            title="Sign in to Miller"
            description="Use your Google account to continue to projects, billing, and account settings."
            footer="Your verified Google email is used to link any existing Miller account and its data."
        >
            <button
                type="button"
                onClick={signInWithGoogle}
                disabled={isSubmitting}
                className={authButtonClassName}
            >
                {isSubmitting
                    ? "Connecting to Google…"
                    : "Continue with Google"}
            </button>
            {error && (
                <p role="alert" className="mt-5 text-sm text-red-300">
                    {error}
                </p>
            )}
        </AuthShell>
    );
}
