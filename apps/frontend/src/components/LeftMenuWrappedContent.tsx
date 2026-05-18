import { PropsWithChildren } from "react";
import { LeftMenu, MenuSection } from "./LeftMenu";
import { Container } from "./Container";
import Layout from "./Layout";
import { getProductColor } from "../styles/themeColors";

export const LeftMenuWrappedContent = ({
    menuSections,
    menuHeaderTitle,
    menuHeaderHref,
    children,
    productKey,
    headerTitle,
    seoDescription,
    seoTitle,
    canonicalUrl,
    noIndex,
}: {
    menuSections: MenuSection[];
    menuHeaderTitle: string;
    menuHeaderHref: string;
    productKey?: string;
    headerTitle?: string;
    seoDescription?: string;
    seoTitle?: string;
    canonicalUrl?: string;
    noIndex?: boolean;
} & PropsWithChildren) => {
    const productColor = getProductColor(productKey);

    return (
        <Layout
            seoDescription={
                seoDescription ||
                "Documentation for Miller dev tools: guides, how-tos, and reference so you can set up quickly and keep shipping with confidence."
            }
            seoTitle={seoTitle || `${headerTitle} - Dev tools to save you time`}
            canonicalUrl={
                canonicalUrl || `https://usemiller.dev${menuHeaderHref}`
            }
            productKey={productKey}
            headerTitle={headerTitle}
            noIndex={noIndex}
        >
            <Container className="w-full min-w-full mx-auto bg-security-black mb-16">
                <div className="flex items-stretch">
                    <LeftMenu
                        header={menuHeaderTitle}
                        headerHref={menuHeaderHref}
                        menuSections={menuSections}
                        productColor={productColor}
                    />
                    {children}
                </div>
            </Container>
        </Layout>
    );
};
