import { useEffect } from "react";
import { useRouter } from "next/router";
import Loading from "../../components/Loading";
import SEO from "../../components/SEO";
import { authClient } from "../../lib/auth-client";

export default function LogoutPage() {
    const router = useRouter();

    useEffect(() => {
        void authClient.signOut({
            fetchOptions: {
                onSuccess: async () => {
                    await router.replace("/");
                },
            },
        });
    }, [router]);

    return (
        <>
            <SEO
                title="Sign out"
                description="Sign out of your Miller account."
                noIndex
            />
            <Loading />
        </>
    );
}
