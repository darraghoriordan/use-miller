import { DocsPageSummary } from "./docParser";

const siteUrl = "https://usemiller.dev";

function productLabel(productKey: string): string {
    switch (productKey) {
        case "miller-start":
            return "Miller Start";
        case "dev-shell":
            return "Dev Shell";
        case "local-dev-tools":
            return "Local Dev Tools";
        default:
            return productKey;
    }
}

export function getDocsHubSeo(products: DocsPageSummary[]) {
    return {
        canonicalUrl: `${siteUrl}/docs`,
        seoTitle: "Miller Docs",
        seoDescription: `Browse setup guides, support docs, and product walkthroughs for ${products
            .map((product) => productLabel(product.productKey))
            .join(", ")}.`,
    };
}

export function getProductDocsSeo(productKey: string, sectionCount: number) {
    const label = productLabel(productKey);
    return {
        canonicalUrl: `${siteUrl}/docs/${productKey}`,
        seoTitle: `${label} Documentation`,
        seoDescription: `Browse ${sectionCount} documentation section${sectionCount === 1 ? "" : "s"} for ${label}, including setup guides, how-tos, and support resources.`,
    };
}

export function getSectionDocsSeo(
    productKey: string,
    sectionName: string,
    pageCount: number,
) {
    const label = productLabel(productKey);
    return {
        seoTitle: `${label} ${sectionName} Docs`,
        seoDescription: `Read ${pageCount} ${sectionName.toLowerCase()} guide${pageCount === 1 ? "" : "s"} for ${label}.`,
    };
}

export function getArticleDocsSeo(
    productKey: string,
    articleTitle: string,
    sectionName: string,
) {
    const label = productLabel(productKey);
    return {
        seoTitle: `${articleTitle} | ${label} Docs`,
        seoDescription: `${articleTitle} in the ${sectionName.toLowerCase()} section of the ${label} documentation.`,
    };
}
