import { FullDoc, getSinglePost } from "../../../docs/docParser.js";
import { createMenu, mapMenuTitle } from "../../../docs/leftMenuGeneration.js";
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
    const menuSections = await createMenu(params.productKey);
    const headerTitle = mapMenuTitle(params.productKey);
    return {
        props: {
            productKey: params.productKey,
            menuSections,
            article,
            headerTitle,
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
        ],
        fallback: false,
    };
}

export default function Home({
    menuSections,
    article,
    productKey,
    headerTitle,
}: {
    menuSections: MenuSection[];
    article: FullDoc;
    productKey: string;
    headerTitle: string;
}) {
    return (
        <LeftMenuWrappedContent
            productKey={productKey}
            menuSections={menuSections}
            menuHeaderTitle={headerTitle}
            menuHeaderHref={`/docs/${productKey}`}
        >
            <DocArticle article={article} />
        </LeftMenuWrappedContent>
    );
}
