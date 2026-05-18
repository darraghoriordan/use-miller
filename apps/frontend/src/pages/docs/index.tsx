import { DocsHubPage } from "../../docs/components/DocsHubPage";
import { createMenu, mapTitles } from "../../docs/leftMenuGeneration";
import { getDocsPageSummaries } from "../../docs/docParser";
import { MenuSection } from "../../components/LeftMenu";
import { LeftMenuWrappedContent } from "../../components/LeftMenuWrappedContent";
import { getDocsHubSeo } from "../../docs/docsSeo";

export async function getStaticProps() {
    const defaultProductKey = "miller-start";
    const menuSections = await createMenu(defaultProductKey);
    const titles = mapTitles(defaultProductKey);
    const products = getDocsPageSummaries();
    const seo = getDocsHubSeo(products);
    return {
        props: {
            productKey: defaultProductKey,
            menuSections,
            products,
            seo,
            ...titles,
        },
    };
}

// export async function getStaticPaths() {
//     return {
//         paths: [
//             {
//                 params: {
//                     productKey: "miller-start",
//                 },
//             },
//         ],
//         fallback: false,
//     };
// }

export default function Home({
    menuSections,
    products,
    productKey,
    menuHeaderTitle,
    headerTitle,
    seo,
}: {
    menuSections: MenuSection[];
    products: ReturnType<typeof getDocsPageSummaries>;
    productKey: string;
    menuHeaderTitle: string;
    headerTitle: string;
    seo: ReturnType<typeof getDocsHubSeo>;
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
            <DocsHubPage products={products} />
        </LeftMenuWrappedContent>
    );
}
