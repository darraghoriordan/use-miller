import { UserProvider } from "@auth0/nextjs-auth0/client";
import "focus-visible";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import "../styles/tailwind.css";
import NextProgress from "next-progress";
import { useRouter } from "next/router.js";
import Head from "next/head.js";

export default function App({ Component, pageProps }: any) {
    const [queryClient] = useState(() => new QueryClient());
    const router = useRouter();
    const canonicalUrl = (
        `https://usemiller.dev` + (router.asPath === "/" ? "" : router.asPath)
    ).split("?")[0];
    return (
        <QueryClientProvider client={queryClient}>
            <UserProvider>
                <Head>
                    <link rel="canonical" href={canonicalUrl} />
                </Head>
                <NextProgress delay={300} options={{ showSpinner: true }} />
                <Component {...pageProps} />
            </UserProvider>
        </QueryClientProvider>
    );
}
