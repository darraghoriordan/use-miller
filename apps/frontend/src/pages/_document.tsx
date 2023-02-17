import { Head, Html, Main, NextScript } from "next/document";
import * as React from "react";
import { Header } from "../components/Header";

export default function Document(props: any) {
    return (
        <Html
            className="h-full scroll-smooth bg-neutral-900 antialiased [font-feature-settings:'ss01']"
            lang="en"
        >
            <Head>
                <meta
                    name="description"
                    content="Learn how to build a fullstack web application at your own pace."
                />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Lexend:wght@400;500&display=swap"
                />
            </Head>

            <body className="flex h-full flex-col">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
