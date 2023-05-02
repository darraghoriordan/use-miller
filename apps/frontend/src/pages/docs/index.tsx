import { FullDoc, getSinglePost } from "../../docs/docParser.js";
import { createMenu, mapTitles } from "../../docs/leftMenuGeneration.js";
import { DocArticle } from "../../docs/components/DocArticle.jsx";
import { MenuSection } from "../../components/LeftMenu.jsx";
import { LeftMenuWrappedContent } from "../../components/LeftMenuWrappedContent.jsx";

export async function getStaticProps() {
    const defaultProductKey = "miller-start";
    const article = await getSinglePost({
        productKey: defaultProductKey,
        slug: "",
        sectionSlug: "",
    });
    console.log("geting single post...");
    const menuSections = await createMenu(defaultProductKey);
    const titles = mapTitles(defaultProductKey);
    return {
        props: {
            productKey: defaultProductKey,
            menuSections,
            article,
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
