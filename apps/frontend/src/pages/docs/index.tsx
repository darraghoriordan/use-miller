import { FullDoc, getSinglePost } from "../../docs/docParser.js";
import { createMenu } from "../../docs/leftMenuGeneration.js";
import { DocArticle } from "../../docs/components/DocArticle.jsx";
import { MenuSection } from "../../components/LeftMenu.jsx";
import { LeftMenuWrappedContent } from "../../components/LeftMenuWrappedContent.jsx";

export async function getStaticProps({
    params,
}: {
    params: { section?: string };
}) {
    const article = await getSinglePost({
        slug: "",
        sectionSlug: "",
    });
    const menuSections = await createMenu();
    return {
        props: {
            menuSections,
            article,
        },
    };
}

export default function Home({
    menuSections,
    article,
}: {
    menuSections: MenuSection[];
    article: FullDoc;
}) {
    return (
        <LeftMenuWrappedContent
            menuSections={menuSections}
            menuHeaderTitle={"Docs"}
            menuHeaderHref={"/docs"}
        >
            <DocArticle article={article} />
        </LeftMenuWrappedContent>
    );
}
