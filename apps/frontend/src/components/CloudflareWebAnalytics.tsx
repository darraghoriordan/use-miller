import { useEffect } from "react";
import { getPublicRuntimeConfig } from "../lib/runtime-config";

export default function CloudflareWebAnalytics() {
    useEffect(() => {
        if (process.env.NODE_ENV !== "production") {
            return;
        }

        const { cloudflareWebAnalyticsToken: token } = getPublicRuntimeConfig();
        const hasCloudflareBeacon = document.querySelector(
            'script[src^="https://static.cloudflareinsights.com/beacon.min.js"]',
        );
        if (!token || hasCloudflareBeacon) {
            return;
        }

        const script = document.createElement("script");
        script.id = "cloudflare-web-analytics";
        script.type = "module";
        script.src = "https://static.cloudflareinsights.com/beacon.min.js";
        script.dataset.cfBeacon = JSON.stringify({ token });
        document.body.appendChild(script);
    }, []);

    return null;
}
