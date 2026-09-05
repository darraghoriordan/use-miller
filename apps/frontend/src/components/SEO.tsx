import Head from "next/head";

const siteUrl = "https://usemiller.dev";
const organizationId = `${siteUrl}/#organization`;
const founderId = `${siteUrl}/#founder`;

export type StructuredData = Record<string, unknown>;

export const config = {
    defaultSiteTitle: "Miller Dev Tools",
    defaultTitle: "Home",
    defaultDescription:
        "Have an idea for a product? Skip straight to the good stuff - providing valuable features to your customers. Miller has all the technology sorted.",
};
export default function SEO({
    description,
    title,
    siteTitle,
    canonicalUrl,
    noIndex,
    markdownUrl,
    structuredData = [],
}: {
    description?: string;
    title?: string;
    siteTitle?: string;
    canonicalUrl?: string;
    noIndex?: boolean;
    markdownUrl?: string;
    structuredData?: StructuredData | StructuredData[];
}) {
    description = description || config.defaultDescription;
    title = title || config.defaultTitle;
    siteTitle = siteTitle || config.defaultSiteTitle;
    const resolvedCanonicalUrl =
        canonicalUrl || (noIndex ? undefined : siteUrl);

    const ogImageUrl = `${siteUrl}/og-default.png`;

    const baseStructuredData: StructuredData[] = [
        {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": `${siteUrl}/#website`,
            name: siteTitle,
            alternateName: ["Miller", "Use Miller"],
            url: siteUrl,
            inLanguage: "en",
            publisher: {
                "@id": organizationId,
            },
        },
        {
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": organizationId,
            name: "Miller Dev Tools",
            alternateName: ["Miller", "Use Miller"],
            url: siteUrl,
            description:
                "Agent-ready and local-first developer tools from Darragh O'Riordan.",
            image: ogImageUrl,
            founder: {
                "@id": founderId,
            },
            sameAs: ["https://github.com/darraghoriordan/use-miller"],
        },
        {
            "@context": "https://schema.org",
            "@type": "Person",
            "@id": founderId,
            name: "Darragh O'Riordan",
            url: "https://www.darraghoriordan.com",
            sameAs: [
                "https://github.com/darraghoriordan",
                "https://x.com/darraghor",
            ],
        },
    ];
    const pageStructuredData = Array.isArray(structuredData)
        ? structuredData
        : [structuredData];
    const allStructuredData = noIndex
        ? []
        : [...baseStructuredData, ...pageStructuredData];

    return (
        <Head>
            <title>{`${title} | ${siteTitle}`}</title>
            <meta name="description" content={description} />
            {resolvedCanonicalUrl ? (
                <link rel="canonical" href={resolvedCanonicalUrl} />
            ) : null}
            {!noIndex ? (
                <link rel="describedby" href={`${siteUrl}/llms.txt`} />
            ) : null}
            {!noIndex && markdownUrl ? (
                <link rel="alternate" type="text/markdown" href={markdownUrl} />
            ) : null}
            {noIndex ? (
                <meta name="robots" content="noindex, nofollow" />
            ) : null}

            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:site_name" content={siteTitle} />
            {resolvedCanonicalUrl ? (
                <meta property="og:url" content={resolvedCanonicalUrl} />
            ) : null}
            <meta property="og:image" content={ogImageUrl} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:creator" content="@darraghor" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImageUrl} />

            {allStructuredData.length > 0 ? (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(allStructuredData),
                    }}
                />
            ) : null}
        </Head>
    );
}
