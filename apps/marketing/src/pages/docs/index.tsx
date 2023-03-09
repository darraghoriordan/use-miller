import Layout from "../../components/Layout.jsx";
import {
    FullDoc,
    getPostData,
    getSortedPostsData,
} from "../../lib/docParser.js";
import {
    LeftMenu,
    MenuItem,
    MenuSection,
    getAllCourses,
} from "@use-miller/shared-frontend-tooling";
import { Container } from "../../components/Container.jsx";
import { useEffect, useState } from "react";

const defaultArticleSlub = "get-started-installation";

export async function getStaticProps() {
    const projects = await getAllCourses({
        apiBase: process.env.NEXT_PUBLIC_API_BASE_PATH,
        fetchApi: fetch,
    });
    const allArticles = getSortedPostsData();
    const getStartedArticle = allArticles.find(
        (x) => x.slug === defaultArticleSlub
    );
    if (!getStartedArticle) {
        return {
            props: {
                menuSections: [],
                mainArticle: undefined,
            },
        };
    }
    const mainArticle = await getPostData(getStartedArticle.slug);

    const uniqueArticleSections = new Set(allArticles.map((x) => x.section));

    const menuSections: MenuSection[] = [
        {
            // get started first!
            name: "Get Started",
            items: allArticles
                .filter((p) => p.section === "Get Started")
                .sort((a, b) => a.order - b.order)
                .map((post) => {
                    return {
                        name: post.title,
                        path: `/docs/${post.slug}`,
                        isCurrent: false,
                    } as MenuItem;
                }),
        },
        {
            // then the project references
            name: "Projects",

            items: projects.map((project) => {
                return {
                    name: project.name,
                    path: `/open/code-doc/${project.key}`,
                    isCurrent: false,
                } as MenuItem;
            }),
        },
    ];
    // add the rest of the sections to the end of the menu
    menuSections.push(
        ...Array.from(uniqueArticleSections)
            .filter((s) => s !== "Get Started")
            .map((section) => {
                return {
                    name: section,
                    items: allArticles
                        .filter((p) => p.section === section)
                        .map((post) => {
                            return {
                                name: post.title,
                                path: `/docs/${post.slug}`,
                                isCurrent: false,
                            } as MenuItem;
                        }),
                };
            })
    );

    return {
        props: {
            menuSections,
            mainArticle,
        },
    };
}

export default function Home({
    menuSections,
    mainArticle,
}: {
    menuSections: MenuSection[];
    mainArticle: FullDoc;
}) {
    const [menuItems, setMenuItems] = useState(menuSections);
    useEffect(() => {
        console.log("running effect");
        const clonedMenuSections = JSON.parse(
            JSON.stringify(menuSections)
        ) as MenuSection[];

        for (const section of clonedMenuSections) {
            for (const item of section.items) {
                if (
                    location.pathname === "/docs" &&
                    item.path.endsWith(defaultArticleSlub)
                ) {
                    item.isCurrent = true;
                }
                if (location.pathname.includes(item.path)) {
                    item.isCurrent = true;
                }
            }
        }
        setMenuItems(clonedMenuSections);
    }, []);

    return (
        <Layout>
            <Container className="w-full min-w-full mx-auto bg-neutral-900 mb-16">
                <div className="flex items-stretch">
                    <LeftMenu menuSections={menuItems} />
                    <div className="ml-24 mt-16 mr-4">
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
            </Container>
        </Layout>
    );
}
