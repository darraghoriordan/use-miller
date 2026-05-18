import { GetServerSideProps } from "next";
import { getDocsPageSummaries } from "../docs/docParser";

const siteUrl = "https://usemiller.dev";

function buildStaticUrls() {
    return [
        "",
        "/about",
        "/privacy",
        "/terms",
        "/miller-start",
        "/dev-shell",
        "/local-dev-tools",
        "/docs",
    ].map((path) => `${siteUrl}${path}`);
}

function buildDocsUrls() {
    const docs = getDocsPageSummaries();

    return docs.flatMap((product) => {
        const productUrls = [`${siteUrl}/docs/${product.productKey}`];
        const sectionUrls = product.sections.map(
            (section) =>
                `${siteUrl}/docs/${product.productKey}/${section.sectionSlug}`,
        );
        const articleUrls = product.sections.flatMap((section) =>
            section.pages.map(
                (page) =>
                    `${siteUrl}/docs/${product.productKey}/${section.sectionSlug}/${page.slug}`,
            ),
        );

        return [...productUrls, ...sectionUrls, ...articleUrls];
    });
}

function buildSitemapXml(urls: string[]) {
    const uniqueUrls = [...new Set(urls)];

    const body = uniqueUrls
        .map((url) => `  <url>\n    <loc>${url}</loc>\n  </url>`)
        .join("\n");

    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    const xml = buildSitemapXml([...buildStaticUrls(), ...buildDocsUrls()]);

    res.setHeader("Content-Type", "application/xml");
    res.write(xml);
    res.end();

    return {
        props: {},
    };
};

export default function SitemapXml() {
    return null;
}
