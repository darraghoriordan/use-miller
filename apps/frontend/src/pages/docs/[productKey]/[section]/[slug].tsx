import {
    getStaticDocsPageSlugs,
    getSinglePost,
} from "../../../../docs/docParser";

import { GetStaticPaths } from "next";
import { createMenu, mapTitles } from "../../../../docs/leftMenuGeneration";
import { getArticleDocsSeo } from "../../../../docs/docsSeo";
import { DocArticle } from "../../../../docs/components/DocArticle";
import { LeftMenuWrappedContent } from "../../../../components/LeftMenuWrappedContent";
import { MenuSection } from "../../../../components/LeftMenu";

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
    const titles = mapTitles(params.productKey);
    const seo = getArticleDocsSeo(
        params.productKey,
        article.title,
        article.section,
    );
    // calculating this locally out of laziness

    return {
        props: JSON.parse(
            JSON.stringify({
                productKey: params.productKey,
                ...titles,
                menuSections,
                article,
                seo,
            }),
        ),
    };
}

export const getStaticPaths: GetStaticPaths = async () => {
    return getStaticDocsPageSlugs();
};

export default function DocsArticlePage({
    productKey,
    menuSections,
    article,
    menuHeaderTitle,
    headerTitle,
    seo,
}: {
    productKey: string;
    menuSections: MenuSection[];
    article: Awaited<ReturnType<typeof getSinglePost>>;
    menuHeaderTitle: string;
    headerTitle: string;
    seo: ReturnType<typeof getArticleDocsSeo>;
}) {
    return (
        <LeftMenuWrappedContent
            productKey={productKey}
            menuSections={menuSections}
            menuHeaderTitle={menuHeaderTitle}
            menuHeaderHref={`/docs/${productKey}`}
            headerTitle={headerTitle}
            canonicalUrl={`https://usemiller.dev/docs/${productKey}/${article.section}/${article.slug}`}
            seoTitle={seo.seoTitle}
            seoDescription={seo.seoDescription}
        >
            <DocArticle article={article} />
        </LeftMenuWrappedContent>
    );
}
