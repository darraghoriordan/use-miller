import {
    FullDoc,
    getSinglePost,
    getStaticDocsPageSlugs,
} from "../../../../docs/docParser.js";
import { createMenu, mapTitles } from "../../../../docs/leftMenuGeneration.js";
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
    const titles = mapTitles(params.productKey);
    return {
        props: {
            productKey: params.productKey,
            menuSections,
            article,
            ...titles,
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
    menuHeaderTitle,
    headerTitle,
}: {
    productKey: string;
    menuSections: MenuSection[];
    article: FullDoc;
    menuHeaderTitle: string;
    headerTitle: string;
}) {
    return (
        <LeftMenuWrappedContent
            productKey={productKey}
            menuSections={menuSections}
            menuHeaderTitle={menuHeaderTitle}
            menuHeaderHref={`/docs/${productKey}`}
            headerTitle={headerTitle}
        >
            <DocArticle article={article} />
        </LeftMenuWrappedContent>
    );
}
