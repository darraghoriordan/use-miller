import { Auth0Provider } from "@auth0/nextjs-auth0";
import "focus-visible";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import "../styles/tailwind.css";
import NextProgress from "next-progress";
import OtelClientSide from "./otel";
import dynamic from "next/dynamic";

const CrispWithNoSSR = dynamic(() => import("../components/CrispChat"));

export default function App({ Component, pageProps }: any) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <Auth0Provider user={pageProps.user}>
                <CrispWithNoSSR />
                <OtelClientSide />
                <NextProgress delay={300} options={{ showSpinner: true }} />
                <Component {...pageProps} />
            </Auth0Provider>
        </QueryClientProvider>
    );
}
