import { useEffect } from "react";
import { useRouter } from "next/router";
import Loading from "../../components/Loading";
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

    return <Loading />;
}
