import { PropsWithChildren } from "react";
import { LeftMenu, MenuSection } from "./LeftMenu.jsx";
import { Container } from "./Container.jsx";
import Layout from "./Layout.jsx";

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
    return (
        <Layout
            seoDescription="Miller dev tools save you time so you can focus on building your product and helping your customers."
            seoTitle={`${headerTitle} - Dev tools to save you time`}
            productKey={productKey}
            headerTitle={headerTitle}
        >
            <Container className="w-full min-w-full mx-auto bg-neutral-900 mb-16">
                <div className="flex items-stretch">
                    <LeftMenu
                        header={menuHeaderTitle}
                        headerHref={menuHeaderHref}
                        menuSections={menuSections}
                    />
                    {children}
                </div>
            </Container>
        </Layout>
    );
};
