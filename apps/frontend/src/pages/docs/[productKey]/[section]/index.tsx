import {
    FullDoc,
    getSinglePost,
    getStaticDocsPageSlugs,
} from "../../../../docs/docParser.js";
import {
    createMenu,
    mapMenuTitle,
} from "../../../../docs/leftMenuGeneration.js";
import { DocArticle } from "../../../../docs/components/DocArticle.jsx";
import { MenuSection } from "../../../../components/LeftMenu.jsx";
import { LeftMenuWrappedContent } from "../../../../components/LeftMenuWrappedContent.jsx";
import { GetStaticPaths, GetStaticPathsContext } from "next";

export async function getStaticProps({
    params,
}: {
    params: { section?: string; productKey: string };
}) {
    const article = await getSinglePost({
        productKey: params.productKey,
        slug: "/",
        sectionSlug: params.section,
    });
    const menuSections = await createMenu(params.productKey);
    const headerTitle = mapMenuTitle(params.productKey);
    return {
        props: {
            productKey: params.productKey,
            menuSections,
            article,
            headerTitle,
        },
    };
}
export const getStaticPaths: GetStaticPaths = async (
    context: GetStaticPathsContext
) => {
    return getStaticDocsPageSlugs();
};

export default function Home({
    productKey,
    menuSections,
    article,
    headerTitle,
}: {
    productKey: string;
    menuSections: MenuSection[];
    article: FullDoc;
    headerTitle: string;
}) {
    return (
        <LeftMenuWrappedContent
            productKey={productKey}
            menuSections={menuSections}
            menuHeaderTitle={headerTitle}
            menuHeaderHref={`/docs/${productKey}`}
        >
            <DocArticle article={article} />
        </LeftMenuWrappedContent>
    );
}
