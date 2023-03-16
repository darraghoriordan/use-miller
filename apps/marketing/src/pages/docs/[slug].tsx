import Layout from "../../components/Layout.jsx";
import {
    FullDoc,
    getStaticDocsPageSlugs,
    getSinglePost,
} from "../../docs/docParser.js";
import { Container } from "../../components/Container.jsx";
import { GetStaticPaths } from "next";
import { createMenu } from "../../docs/leftMenu.js";
import { DocArticle } from "../../docs/components/DocArticle.jsx";
import { LeftMenu, MenuSection } from "../../docs/components/LeftMenu.jsx";

export async function getStaticProps({
    params,
}: {
    params: { slug?: string };
}) {
    const article = await getSinglePost(params.slug);
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
        <Layout>
            <Container className="w-full min-w-full mx-auto bg-neutral-900 mb-16">
                <div className="flex items-stretch">
                    <LeftMenu menuSections={menuSections} />
                    <DocArticle article={article} />
                </div>
            </Container>
        </Layout>
    );
}
