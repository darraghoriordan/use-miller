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
}: {
    menuSections: MenuSection[];
    menuHeaderTitle: string;
    menuHeaderHref: string;
    productKey?: string;
    headerTitle?: string;
} & PropsWithChildren) => {
    const productColor = getProductColor(productKey);

    return (
        <Layout
            seoDescription="Miller dev tools save you time so you can focus on building your product and helping your customers."
            seoTitle={`${headerTitle} - Dev tools to save you time`}
            productKey={productKey}
            headerTitle={headerTitle}
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
