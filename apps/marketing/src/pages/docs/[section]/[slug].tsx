import {
    FullDoc,
    getStaticDocsPageSlugs,
    getSinglePost,
} from "../../../docs/docParser.js";

import { GetStaticPaths } from "next";
import { createMenu } from "../../../docs/leftMenuGeneration.js";
import { DocArticle } from "../../../docs/components/DocArticle.jsx";
import { MenuSection } from "../../../components/LeftMenu.jsx";
import { LeftMenuWrappedContent } from "../../../components/LeftMenuWrappedContent.jsx";

export async function getStaticProps({
    params,
}: {
    params: { slug?: string; section?: string };
}) {
    const article = await getSinglePost({
        slug: params.slug,
        sectionSlug: params.section,
    });
    const menuSections = await createMenu();
    return {
        props: {
            menuSections,
            article,
        },
    };
}

export const getStaticPaths: GetStaticPaths = async () => {
    return getStaticDocsPageSlugs();
};

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
