import { UserProvider } from "@auth0/nextjs-auth0/client";
import "focus-visible";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import "../styles/tailwind.css";

export default function App({ Component, pageProps }: any) {
    const providerConfig = {
        domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN,
        clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
        authorizationParams: {
            redirect_uri: process.env.NEXT_PUBLIC_APP_BASE_PATH,
        },
    };
    const [queryClient] = useState(() => new QueryClient());
    return (
        <QueryClientProvider client={queryClient}>
            <UserProvider {...providerConfig}>
                <Component {...pageProps} />{" "}
            </UserProvider>
        </QueryClientProvider>
    );
}
