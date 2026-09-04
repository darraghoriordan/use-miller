export const GA_MEASUREMENT_ID =
    process.env.NEXT_PUBLIC_GA_ID || "G-V43743ZN7K";

export type AnalyticsEventName =
    | "dev_shell_begin_checkout"
    | "local_dev_tools_begin_checkout"
    | "local_dev_tools_download"
    | "miller_consulting_begin_checkout"
    | "miller_start_agent_click";

type AnalyticsEventParameters = Record<
    string,
    boolean | number | string | undefined
>;

declare global {
    interface Window {
        dataLayer?: unknown[];
        gtag?: (...args: unknown[]) => void;
    }
}

export function trackAnalyticsEvent(
    eventName: AnalyticsEventName,
    parameters: AnalyticsEventParameters = {},
): void {
    if (typeof window === "undefined" || !window.gtag) {
        return;
    }

    window.gtag("event", eventName, parameters);
}

export function trackPageView(path: string): void {
    if (typeof window === "undefined" || !window.gtag) {
        return;
    }

    window.gtag("config", GA_MEASUREMENT_ID, { page_path: path });
}

export function trackCheckoutIntent(productKey: string): void {
    switch (productKey) {
        case "dev-shell":
            trackAnalyticsEvent("dev_shell_begin_checkout", { productKey });
            break;
        case "miller-start-consulting":
            trackAnalyticsEvent("miller_consulting_begin_checkout", {
                productKey,
            });
            break;
    }
}
