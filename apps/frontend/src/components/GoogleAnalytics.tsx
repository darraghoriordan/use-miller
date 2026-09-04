import Script from "next/script";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { GA_MEASUREMENT_ID, trackPageView } from "../lib/analytics";

const GoogleAnalytics = () => {
    const router = useRouter();
    const isEnabled = process.env.NODE_ENV === "production";

    useEffect(() => {
        if (!isEnabled) {
            return;
        }

        const handleRouteChange = (url: string) => trackPageView(url);
        router.events.on("routeChangeComplete", handleRouteChange);

        return () => {
            router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, [isEnabled, router.events]);

    if (!isEnabled) {
        return null;
    }

    return (
        <>
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${GA_MEASUREMENT_ID}');
                    `,
                }}
            />
        </>
    );
};

export default GoogleAnalytics;
