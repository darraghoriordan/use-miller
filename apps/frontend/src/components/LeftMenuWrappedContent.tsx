import { PropsWithChildren } from "react";
import { LeftMenu, MenuSection } from "./LeftMenu.jsx";
import { Container } from "./Container.jsx";
import Layout from "./Layout.jsx";

export const LeftMenuWrappedContent = ({
    menuSections,
    menuHeaderTitle,
    menuHeaderHref,
    children,
}: {
    menuSections: MenuSection[];
    menuHeaderTitle: string;
    menuHeaderHref: string;
} & PropsWithChildren) => {
    return (
        <Layout>
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
