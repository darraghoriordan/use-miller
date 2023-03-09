import Layout from "../../components/Layout.jsx";
import {
    FullDoc,
    getAllPostIds,
    getPostData,
    getSortedPostsData,
    SummaryDoc,
} from "../../lib/docParser.js";
import {
    LeftMenu,
    MenuItem,
    MenuSection,
} from "@use-miller/shared-frontend-tooling";
import { Container } from "../../components/Container.jsx";

export async function getStaticProps({
    params,
}: {
    params: { slug?: string };
}) {
    const allArticles = getSortedPostsData();
    if (!params.slug) {
        params.slug = allArticles[0].slug;
    }
    const mainArticle = await getPostData(params.slug);

    return {
        props: {
            allArticles,
            mainArticle,
        },
    };
}

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    };
}

export default function Home({
    allArticles,
    mainArticle,
}: {
    allArticles: SummaryDoc[];
    mainArticle: FullDoc;
}) {
    const menuSections: MenuSection[] = [
        {
            name: "Get Started",
            items: allArticles.map((post) => {
                return {
                    name: post.title,
                    path: `/docs/${post.slug}`,
                    isCurrent: false,
                } as MenuItem;
            }),
        },
        {
            name: "Projects",
            items: [],
            // items: projects.data.map((project) => {
            //     return {
            //         name: project.name,
            //         path: `/open/code-doc/${project.key}`,
            //         isCurrent: location.pathname.includes(project.key),
            //     } as MenuItem;
            // }),
        },
    ];

    return (
        <Layout>
            <Container className="w-full min-w-full mx-auto bg-neutral-900 mb-16">
                <div className="flex items-stretch">
                    <LeftMenu menuSections={menuSections} />
                    <div className="ml-24 mt-16 mr-4">
                        <div>
                            <h1 className="text-white font-medium text-4xl mb-8">
                                {mainArticle?.title}
                            </h1>

                            <article
                                className="mb-4 prose prose-lg prose-invert"
                                dangerouslySetInnerHTML={{
                                    __html: mainArticle?.html,
                                }}
                            ></article>
                        </div>
                    </div>
                </div>
            </Container>
        </Layout>
    );
}
