import { MenuItem, MenuSection } from "../components/LeftMenu.jsx";
import { getAllCourses } from "./courses/useGetAllCourses.js";
import { getSortedPostsData } from "./docParser.js";

export async function sortByCustomSlugMapping(
    menuSections: MenuSection[]
): Promise<MenuSection[]> {
    const customOrderSections: MenuSection[] = [
        menuSections.find((section) => section.slug === "get-started")!,
        menuSections.find((section) => section.slug === "reference")!,
    ];
    const otherSections = menuSections.filter(
        (section) => !customOrderSections.find((s) => s.slug === section.slug)
    );
    return [...customOrderSections, ...otherSections];
}

export async function createMenu(productKey: string): Promise<MenuSection[]> {
    if (fetch === undefined) {
        throw new Error(
            "fetch is undefined. This should never happen but most likely you're using a very old browser or old nodeJS."
        );
    }
    const projects = await getAllCourses(productKey, {
        apiBase: process.env.NEXT_PUBLIC_API_BASE_PATH,
        fetchApi: fetch,
    });
    // add all the docs that were found
    const postData = getSortedPostsData().find(
        (p) => p.productKey === productKey
    )?.sections;
    const allMenuItems =
        postData?.map((section) => {
            return {
                name: section.sectionDisplayName,
                slug: section.sectionSlug,
                items: section.pages.map((page) => {
                    return {
                        name: page.title,
                        path: `/docs/${productKey}/${section.sectionSlug}/${page.slug}`,
                    } as MenuItem;
                }),
            } as MenuSection;
        }) || [];
    // then the code project references
    allMenuItems.push({
        name: "Code Reference",
        slug: "reference",
        items:
            projects.map((project) => {
                return {
                    name: project.name,
                    path: `/docs/${productKey}/reference/${project.key}/${btoa(
                        "/README.md"
                    )}`,
                } as MenuItem;
            }) || [],
    });

    return sortByCustomSlugMapping(allMenuItems);
}
