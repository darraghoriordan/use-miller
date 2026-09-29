import "focus-visible";
import "../styles/tailwind.css";
import NextProgress from "next-progress";
import OtelClientSide from "../otel/OtelClientSide";
import dynamic from "next/dynamic";

const CrispWithNoSSR = dynamic(() => import("../components/CrispChat"));
const CloudflareWebAnalyticsWithNoSSR = dynamic(
    () => import("../components/CloudflareWebAnalytics"),
    { ssr: false },
);

export default function App({ Component, pageProps }: any) {
    return (
        <>
            <CloudflareWebAnalyticsWithNoSSR />
            <CrispWithNoSSR />
            <OtelClientSide />
            <NextProgress delay={300} options={{ showSpinner: true }} />
            <Component {...pageProps} />
        </>
    );
}
