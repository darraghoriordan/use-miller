import { PropsWithChildren } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import SEO from "../components/SEO";
import { ThemeColor } from "../styles/themeColors";

export default function Layout({
    productKey,
    headerTitle,
    children,
    seoDescription,
    seoTitle,
    canonicalUrl,
    themeColor,
    noIndex,
}: {
    productKey?: string;
    headerTitle?: string;
    seoTitle: string;
    seoDescription: string;
    canonicalUrl?: string;
    themeColor?: ThemeColor;
    noIndex?: boolean;
} & PropsWithChildren) {
    return (
        <div className="flex flex-col min-h-screen">
            <SEO
                title={seoTitle || "Home"}
                description={seoDescription}
                canonicalUrl={canonicalUrl}
                noIndex={noIndex}
            />
            <Header
                productKey={productKey}
                headerTitle={headerTitle}
                themeColor={themeColor}
            />
            <main className="grow">{children}</main>
            <Footer productKey={productKey} headerTitle={headerTitle} />
        </div>
    );
}
