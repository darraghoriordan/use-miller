import {
    FullDoc,
    getStaticDocsPageSlugs,
    getSinglePost,
} from "../../../../docs/docParser.js";

import { GetStaticPaths } from "next";
import {
    createMenu,
    mapMenuTitle,
} from "../../../../docs/leftMenuGeneration.js";
import { DocArticle } from "../../../../docs/components/DocArticle.jsx";
import { MenuSection } from "../../../../components/LeftMenu.jsx";
import { LeftMenuWrappedContent } from "../../../../components/LeftMenuWrappedContent.jsx";

export async function getStaticProps({
    params,
}: {
    params: { slug?: string; section?: string; productKey: string };
}) {
    const article = await getSinglePost({
        productKey: params.productKey,
        slug: params.slug,
        sectionSlug: params.section,
    });
    const menuSections = await createMenu(params.productKey);
    const headerTitle = mapMenuTitle(params.productKey);
    // calculating this locally out of laziness

    return {
        props: {
            productKey: params.productKey,
            headerTitle,
            menuSections,
            article,
        },
    };
}

export const getStaticPaths: GetStaticPaths = async () => {
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
    headerTitle: string;
    article: FullDoc;
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
