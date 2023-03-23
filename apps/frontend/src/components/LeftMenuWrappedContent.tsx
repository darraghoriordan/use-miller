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
}: {
    menuSections: MenuSection[];
    menuHeaderTitle: string;
    menuHeaderHref: string;
    productKey: string;
} & PropsWithChildren) => {
    return (
        <Layout
            seoDescription="Miller builds tools for busy developers. Learn NestJs and NextJs, enrich your shell, get useful local dev tools, and more."
            seoTitle="Miller - Tools for busy devs!"
            headerTitle="Miller"
            productKey={productKey}
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
