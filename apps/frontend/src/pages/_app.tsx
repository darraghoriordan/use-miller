import "focus-visible";
import "../styles/tailwind.css";
import NextProgress from "next-progress";
import OtelClientSide from "./otel";
import dynamic from "next/dynamic";

const CrispWithNoSSR = dynamic(() => import("../components/CrispChat"));
const GoogleAnalyticsWithNoSSR = dynamic(
    () => import("../components/GoogleAnalytics"),
);

export default function App({ Component, pageProps }: any) {
    return (
        <>
            <GoogleAnalyticsWithNoSSR />
            <CrispWithNoSSR />
            <OtelClientSide />
            <NextProgress delay={300} options={{ showSpinner: true }} />
            <Component {...pageProps} />
        </>
    );
}
