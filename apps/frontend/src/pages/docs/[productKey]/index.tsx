import { ProductDocsHubPage } from "../../../docs/components/ProductDocsHubPage";
import { createMenu, mapTitles } from "../../../docs/leftMenuGeneration";
import { getDocsPageSummaries } from "../../../docs/docParser";
import { MenuSection } from "../../../components/LeftMenu";
import { LeftMenuWrappedContent } from "../../../components/LeftMenuWrappedContent";
import { getProductDocsSeo } from "../../../docs/docsSeo";

export async function getStaticProps({
    params,
}: {
    params: { productKey: string };
}) {
    const menuSections = await createMenu(params.productKey);
    const titles = mapTitles(params.productKey);
    const product = getDocsPageSummaries().find(
        (entry) => entry.productKey === params.productKey,
    );

    if (!product) {
        return { notFound: true };
    }

    const seo = getProductDocsSeo(product.productKey, product.sections.length);
    return {
        props: {
            productKey: params.productKey,
            menuSections,
            product,
            seo,
            ...titles,
        },
    };
}

export async function getStaticPaths() {
    return {
        paths: [
            {
                params: {
                    productKey: "miller-start",
                },
            },
            {
                params: {
                    productKey: "dev-shell",
                },
            },
            {
                params: {
                    productKey: "local-dev-tools",
                },
            },
        ],
        fallback: false,
    };
}

export default function Home({
    menuSections,
    product,
    productKey,
    menuHeaderTitle,
    headerTitle,
    seo,
}: {
    menuSections: MenuSection[];
    product: ReturnType<typeof getDocsPageSummaries>[number];
    productKey: string;
    menuHeaderTitle: string;
    headerTitle: string;
    seo: ReturnType<typeof getProductDocsSeo>;
}) {
    return (
        <LeftMenuWrappedContent
            productKey={productKey}
            menuSections={menuSections}
            menuHeaderTitle={menuHeaderTitle}
            menuHeaderHref={`/docs/${productKey}`}
            headerTitle={headerTitle}
            canonicalUrl={seo.canonicalUrl}
            seoTitle={seo.seoTitle}
            seoDescription={seo.seoDescription}
        >
            <ProductDocsHubPage product={product} />
        </LeftMenuWrappedContent>
    );
}
