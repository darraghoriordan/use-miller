import { Head, Html, Main, NextScript } from "next/document";

export default function Document(props: any) {
    return (
        <Html
            className="h-full scroll-smooth bg-security-black antialiased"
            lang="en"
        >
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                {/* IBM Plex Sans for body, JetBrains Mono for display/code */}
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
                />
            </Head>

            <body className="bg-security-black text-security-light">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
