import {
    getDocsPageSummaries,
    getStaticDocsSectionPaths,
} from "../../../../docs/docParser";
import { createMenu, mapTitles } from "../../../../docs/leftMenuGeneration";
import { SectionDocsHubPage } from "../../../../docs/components/SectionDocsHubPage";
import { MenuSection } from "../../../../components/LeftMenu";
import { LeftMenuWrappedContent } from "../../../../components/LeftMenuWrappedContent";
import { GetStaticPaths, GetStaticPathsContext } from "next";
import { getSectionDocsSeo } from "../../../../docs/docsSeo";

export async function getStaticProps({
    params,
}: {
    params: { section?: string; productKey: string };
}) {
    const product = getDocsPageSummaries().find(
        (entry) => entry.productKey === params.productKey,
    );

    const section = product?.sections.find(
        (entry) => entry.sectionSlug === params.section,
    );

    if (!product || !section) {
        return { notFound: true };
    }

    const menuSections = await createMenu(params.productKey);
    const titles = mapTitles(params.productKey);
    const seo = getSectionDocsSeo(
        product.productKey,
        section.sectionDisplayName,
        section.pages.length,
    );

    return {
        props: {
            productKey: params.productKey,
            menuSections,
            product,
            section,
            seo,
            ...titles,
        },
    };
}
export const getStaticPaths: GetStaticPaths = async (
    _context: GetStaticPathsContext,
) => {
    return getStaticDocsSectionPaths();
};

export default function Home({
    productKey,
    menuSections,
    product,
    section,
    menuHeaderTitle,
    headerTitle,
    seo,
}: {
    productKey: string;
    menuSections: MenuSection[];
    product: ReturnType<typeof getDocsPageSummaries>[number];
    section: ReturnType<
        typeof getDocsPageSummaries
    >[number]["sections"][number];
    menuHeaderTitle: string;
    headerTitle: string;
    seo: ReturnType<typeof getSectionDocsSeo>;
}) {
    return (
        <LeftMenuWrappedContent
            productKey={productKey}
            menuSections={menuSections}
            menuHeaderTitle={menuHeaderTitle}
            menuHeaderHref={`/docs/${productKey}`}
            headerTitle={headerTitle}
            canonicalUrl={`https://usemiller.dev/docs/${productKey}/${section.sectionSlug}`}
            seoTitle={seo.seoTitle}
            seoDescription={seo.seoDescription}
        >
            <SectionDocsHubPage product={product} section={section} />
        </LeftMenuWrappedContent>
    );
}
