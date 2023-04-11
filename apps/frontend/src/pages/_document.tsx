import { Head, Html, Main, NextScript } from "next/document";
import * as React from "react";

export default function Document(props: any) {
    return (
        <Html
            className="h-full scroll-smooth bg-neutral-900 antialiased [font-feature-settings:'ss01']"
            lang="en"
        >
            <Head>
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
                <script
                    defer
                    data-domain="usemiller.dev"
                    src="https://plausible.io/js/script.js"
                ></script>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
