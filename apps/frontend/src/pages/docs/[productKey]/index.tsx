import { FullDoc, getSinglePost } from "../../../docs/docParser.js";
import { createMenu, mapTitles } from "../../../docs/leftMenuGeneration.js";
import { DocArticle } from "../../../docs/components/DocArticle.jsx";
import { MenuSection } from "../../../components/LeftMenu.jsx";
import { LeftMenuWrappedContent } from "../../../components/LeftMenuWrappedContent.jsx";

export async function getStaticProps({
    params,
}: {
    params: { productKey: string };
}) {
    const article = await getSinglePost({
        productKey: params.productKey,
        slug: "",
        sectionSlug: "",
    });
    console.log("geting single post...");
    const menuSections = await createMenu(params.productKey);
    const titles = mapTitles(params.productKey);
    return {
        props: {
            productKey: params.productKey,
            menuSections,
            article,
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
    article,
    productKey,
    menuHeaderTitle,
    headerTitle,
}: {
    menuSections: MenuSection[];
    article: FullDoc;
    productKey: string;
    menuHeaderTitle: string;
    headerTitle: string;
}) {
    return (
        <LeftMenuWrappedContent
            productKey={productKey}
            menuSections={menuSections}
            menuHeaderTitle={menuHeaderTitle}
            menuHeaderHref={`/docs/${productKey}`}
            headerTitle={headerTitle}
        >
            <DocArticle article={article} />
        </LeftMenuWrappedContent>
    );
}
