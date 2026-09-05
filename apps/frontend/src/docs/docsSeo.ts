import { DocsPageSummary } from "./docParser";
import type { StructuredData } from "../components/SEO";

const siteUrl = "https://usemiller.dev";
const websiteId = `${siteUrl}/#website`;
const organizationId = `${siteUrl}/#organization`;
const founderId = `${siteUrl}/#founder`;

type Breadcrumb = {
    name: string;
    url: string;
};

function getBreadcrumbStructuredData(items: Breadcrumb[]): StructuredData {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}

function getCollectionStructuredData({
    name,
    description,
    url,
}: {
    name: string;
    description: string;
    url: string;
}): StructuredData {
    return {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": `${url}#page`,
        name,
        description,
        url,
        inLanguage: "en",
        isPartOf: {
            "@id": websiteId,
        },
    };
}

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

function displayLabel(slug: string): string {
    return slug
        .split("-")
        .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
        .join(" ");
}

export function getDocsHubSeo(products: DocsPageSummary[]) {
    const canonicalUrl = `${siteUrl}/docs`;
    const seoTitle = "Miller Documentation";
    const seoDescription = `Browse setup guides, support docs, and product walkthroughs for ${products
        .map((product) => productLabel(product.productKey))
        .join(", ")}.`;
    return {
        canonicalUrl,
        seoTitle,
        seoDescription,
        structuredData: [
            getCollectionStructuredData({
                name: seoTitle,
                description: seoDescription,
                url: canonicalUrl,
            }),
            getBreadcrumbStructuredData([
                { name: "Miller Dev Tools", url: siteUrl },
                { name: "Documentation", url: canonicalUrl },
            ]),
        ],
    };
}

export function getProductDocsSeo(productKey: string, sectionCount: number) {
    const label = productLabel(productKey);
    const canonicalUrl = `${siteUrl}/docs/${productKey}`;
    const seoTitle = `${label} Documentation`;
    const seoDescription = `Browse ${sectionCount} documentation section${sectionCount === 1 ? "" : "s"} for ${label}, including setup guides, how-tos, and support resources.`;
    return {
        canonicalUrl,
        seoTitle,
        seoDescription,
        structuredData: [
            getCollectionStructuredData({
                name: seoTitle,
                description: seoDescription,
                url: canonicalUrl,
            }),
            getBreadcrumbStructuredData([
                { name: "Miller Dev Tools", url: siteUrl },
                { name: "Documentation", url: `${siteUrl}/docs` },
                { name: label, url: canonicalUrl },
            ]),
        ],
    };
}

export function getSectionDocsSeo(
    productKey: string,
    sectionName: string,
    pageCount: number,
) {
    const label = productLabel(productKey);
    const canonicalUrl = `${siteUrl}/docs/${productKey}/${sectionName.toLowerCase().replace(/\s+/g, "-")}`;
    const seoTitle = `${label} ${sectionName} Docs`;
    const seoDescription = `Read ${pageCount} ${sectionName.toLowerCase()} guide${pageCount === 1 ? "" : "s"} for ${label}.`;
    return {
        canonicalUrl,
        seoTitle,
        seoDescription,
        structuredData: [
            getCollectionStructuredData({
                name: seoTitle,
                description: seoDescription,
                url: canonicalUrl,
            }),
            getBreadcrumbStructuredData([
                { name: "Miller Dev Tools", url: siteUrl },
                { name: "Documentation", url: `${siteUrl}/docs` },
                { name: label, url: `${siteUrl}/docs/${productKey}` },
                { name: sectionName, url: canonicalUrl },
            ]),
        ],
    };
}

export function getArticleDocsSeo(
    productKey: string,
    articleTitle: string,
    sectionName: string,
    articleSlug: string,
    description: string,
) {
    const label = productLabel(productKey);
    const sectionSlug = sectionName.toLowerCase().replace(/\s+/g, "-");
    const sectionLabel = displayLabel(sectionSlug);
    const canonicalUrl = `${siteUrl}/docs/${productKey}/${sectionSlug}/${articleSlug}`;
    const seoTitle = `${articleTitle} | ${label} Docs`;
    return {
        canonicalUrl,
        seoTitle,
        seoDescription: description,
        structuredData: [
            {
                "@context": "https://schema.org",
                "@type": "TechArticle",
                "@id": `${canonicalUrl}#article`,
                headline: articleTitle,
                description,
                url: canonicalUrl,
                inLanguage: "en",
                mainEntityOfPage: canonicalUrl,
                author: {
                    "@id": founderId,
                },
                publisher: {
                    "@id": organizationId,
                },
                isPartOf: {
                    "@id": `${siteUrl}/docs/${productKey}#page`,
                },
            },
            getBreadcrumbStructuredData([
                { name: "Miller Dev Tools", url: siteUrl },
                { name: "Documentation", url: `${siteUrl}/docs` },
                { name: label, url: `${siteUrl}/docs/${productKey}` },
                {
                    name: sectionLabel,
                    url: `${siteUrl}/docs/${productKey}/${sectionSlug}`,
                },
                { name: articleTitle, url: canonicalUrl },
            ]),
        ],
    };
}
