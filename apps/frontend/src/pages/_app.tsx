import { UserProvider } from "@auth0/nextjs-auth0/client";
import "focus-visible";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import "../styles/tailwind.css";
import NextProgress from "next-progress";

export default function App({ Component, pageProps }: any) {
    const [queryClient] = useState(() => new QueryClient());
    return (
        <QueryClientProvider client={queryClient}>
            <UserProvider>
                <NextProgress delay={300} options={{ showSpinner: true }} />
                <Component {...pageProps} />
            </UserProvider>
        </QueryClientProvider>
    );
}
