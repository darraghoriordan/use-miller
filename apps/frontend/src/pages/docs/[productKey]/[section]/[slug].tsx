import {
    FullDoc,
    getStaticDocsPageSlugs,
    getSinglePost,
} from "../../../../docs/docParser.js";

import { GetStaticPaths } from "next";
import { createMenu } from "../../../../docs/leftMenuGeneration.js";
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
    return {
        props: {
            productKey: params.productKey,
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
}: {
    productKey: string;
    menuSections: MenuSection[];
    article: FullDoc;
}) {
    return (
        <LeftMenuWrappedContent
            menuSections={menuSections}
            menuHeaderTitle={"Docs"}
            menuHeaderHref={`/docs/${productKey}`}
        >
            <DocArticle article={article} />
        </LeftMenuWrappedContent>
    );
}
