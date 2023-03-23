import { PropsWithChildren } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import SEO from "../components/SEO";

export default function Layout({
    productKey,
    headerTitle,
    children,
    seoDescription,
    seoTitle,
    themeColor,
}: {
    productKey: string;
    headerTitle?: string;
    seoTitle: string;
    seoDescription: string;
    themeColor?: "green" | "cyan" | "amber" | "red" | "violet" | "pink";
} & PropsWithChildren) {
    return (
        <div className="flex flex-col min-h-screen">
            <SEO title={seoTitle || "Home"} description={seoDescription} />
            <Header
                productKey={productKey}
                headerTitle={headerTitle}
                themeColor={themeColor}
            />
            <main className="flex-grow">{children}</main>
            <Footer productKey={productKey} />
        </div>
    );
}
