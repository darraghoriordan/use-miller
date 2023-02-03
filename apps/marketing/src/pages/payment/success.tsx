import Head from "next/head";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Auth0Client } from "@auth0/auth0-spa-js";
import { useEffect } from "react";

export default function PaymentSuccess() {
    let auth0client: Auth0Client;
    let paymentId: string;

    useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        paymentId = params["session_id"];

        auth0client = new Auth0Client({
            domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN as string,
            clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID as string,
            authorizationParams: {
                audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
                redirectUri: `${process.env.NEXT_PUBLIC_APP_BASE_PATH}/auth/callback?session_id=${paymentId}`,
                scope: "openid profile email",
            },
        });
    }, []);

    return (
        <>
            <Head>
                <title>Miller - A product kit for makers</title>
                <meta
                    name="description"
                    content="Have an idea for a product? Skip straight to the good stuff - providing valuable features to your customers. Miller has all the technology sorted."
                />
            </Head>
            <Header />
            <main>
                <div>payment success - amazing now create an account </div>
                <button
                    onClick={async () => {
                        await auth0client.loginWithRedirect({
                            appState: {
                                paymentId: paymentId,
                            },
                            authorizationParams: {
                                screen_hint: "signup",
                            },
                        });
                    }}
                >
                    Create account
                </button>
            </main>
            <Footer />
        </>
    );
}
