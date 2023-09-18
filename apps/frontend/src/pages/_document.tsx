import { Head, Html, Main, NextScript } from "next/document";
import * as React from "react";
import Script from "next/script";

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
                <Script type="text/javascript">
                    {`window.$crisp=[];
    window.CRISP_WEBSITE_ID="0c58d997-a702-4b2d-86be-e84db144747c";
    (function(){d=document;s=d.createElement("script");
    s.src="https://client.crisp.chat/l.js";
    s.async=1;d.getElementsByTagName("head")[0].appendChild(s);
    })();`}
                </Script>{" "}
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
