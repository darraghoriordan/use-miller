import Head from "next/head";

export const config = {
    defaultSiteTitle: "Miller Tools",
    defaultTitle: "Home",
    defaultDescription:
        "Have an idea for a product? Skip straight to the good stuff - providing valuable features to your customers. Miller has all the technology sorted.",
};
export default function SEO({
    description,
    title,
    siteTitle,
}: {
    description?: string;
    title?: string;
    siteTitle?: string;
}) {
    description = description || config.defaultDescription;
    title = title || config.defaultTitle;
    siteTitle = siteTitle || config.defaultSiteTitle;
    return (
        <Head>
            <title>{`${title} | ${siteTitle}`}</title>
            <meta name="description" content={description} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:site_name" content={siteTitle} />
            <meta property="twitter:card" content="summary" />
            <meta property="twitter:creator" content="@darraghor" />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
        </Head>
    );
}
