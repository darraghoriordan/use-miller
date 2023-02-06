import { UserProvider } from "@auth0/nextjs-auth0/client";
import "focus-visible";
import "../styles/tailwind.css";

export default function App({ Component, pageProps }: any) {
    const providerConfig = {
        domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN,
        clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
        authorizationParams: {
            redirect_uri: process.env.NEXT_PUBLIC_APP_BASE_PATH,
        },
    };
    return (
        <UserProvider {...providerConfig}>
            <Component {...pageProps} />{" "}
        </UserProvider>
    );
}
