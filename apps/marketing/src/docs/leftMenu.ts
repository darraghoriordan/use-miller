import {
    getAllCourses,
    MenuItem,
    MenuSection,
} from "@use-miller/shared-frontend-tooling";
import { getSortedPostsData } from "./docParser.js";

export async function createMenu(): Promise<MenuSection[]> {
    if (fetch === undefined) {
        throw new Error("fetch is undefined");
    }
    const projects = await getAllCourses({
        apiBase: process.env.NEXT_PUBLIC_API_BASE_PATH,
        fetchApi: fetch,
    });
    const allArticles = getSortedPostsData();

    const menuSections: MenuSection[] = [
        {
            // get started first!
            name: "Get Started",
            items:
                allArticles
                    .filter((p) => p.section === "Get Started")
                    .sort((a, b) => a.order - b.order)
                    .map((post) => {
                        return {
                            name: post.title,
                            path: `/docs/${post.slug}`,
                        } as MenuItem;
                    }) || [],
        },
        {
            // then the project references
            name: "Projects",
            items:
                projects.map((project) => {
                    return {
                        name: project.name,
                        path: `/docs/reference/${project.key}/${btoa(
                            "/README.md"
                        )}`,
                    } as MenuItem;
                }) || [],
        },
    ];

    return menuSections;
}
