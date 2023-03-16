import Layout from "../../components/Layout.js";
import { FullDoc, getSinglePost } from "../../docs/docParser.js";
import { Container } from "../../components/Container.js";
import { createMenu } from "../../docs/leftMenu.js";
import { DocArticle } from "../../docs/components/DocArticle.jsx";
import { LeftMenu, MenuSection } from "../../docs/components/LeftMenu.jsx";

export async function getStaticProps() {
    const article = await getSinglePost("/");
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
