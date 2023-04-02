import { MenuItem, MenuSection } from "../components/LeftMenu.jsx";
import { getSortedPostsData } from "./docParser.js";

export async function sortByCustomSlugMapping(
    menuSections: MenuSection[]
): Promise<MenuSection[]> {
    const customOrderSections: MenuSection[] = [];
    const getStartedSection = menuSections.find(
        (section) => section.slug === "get-started"
    )!;
    if (getStartedSection) {
        customOrderSections.push(getStartedSection);
    }
    const refSection = menuSections.find(
        (section) => section.slug === "reference"
    )!;
    if (refSection) {
        customOrderSections.push(refSection);
    }

    return [
        ...customOrderSections,
        ...menuSections.filter(
            (section) =>
                !customOrderSections.some((s) => s.slug === section.slug)
        ),
    ];
}

export function mapTitles(productKey: string): {
    headerTitle: string;
    menuHeaderTitle: string;
} {
    // calculating this locally out of laziness
    switch (productKey) {
        case "miller-start":
            return {
                menuHeaderTitle: "Miller Start Docs",
                headerTitle: "Miller // Start",
            };

        case "local-dev-tools":
            return {
                menuHeaderTitle: "Dev Tools Docs",
                headerTitle: "Miller // Local Dev Tools",
            };

        case "dev-shell":
            return {
                menuHeaderTitle: "DevShell Docs",
                headerTitle: "Miller // Dev Shell",
            };

        default:
            return {
                menuHeaderTitle: "Docs",
                headerTitle: "Miller Dev Tools",
            };
    }
}
// hack to have this work in SSG mode
// there is an api for this data also
// but then building the site would require a backend to be available
function getProjectMeta(productKey: string) {
    const allProjects = {
        ["miller-start"]: {
            projectMeta: [
                {
                    key: "miller-web",
                    name: "Miller Web",
                },
                {
                    key: "nestjs-backend-libs",
                    name: "NestJs Backend Libraries",
                },
            ],
        },
        ["dev-shell"]: {
            projectMeta: [
                {
                    key: "dev-shell-scripts",
                    name: "Dev Shell Scripts",
                },
            ],
        },
        ["local-dev-tools"]: {
            projectMeta: [],
        },
    };

    return allProjects[productKey as keyof typeof allProjects];
}
export async function createMenu(productKey: string): Promise<MenuSection[]> {
    if (fetch === undefined) {
        throw new Error(
            "fetch is undefined. This should never happen but most likely you're using a very old browser or old nodeJS."
        );
    }

    const projects = getProjectMeta(productKey)?.projectMeta;
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
    if (projects?.length > 0) {
        allMenuItems.push({
            name: "Code Reference",
            slug: "reference",
            items:
                projects.map((project) => {
                    return {
                        name: project.name,
                        path: `/docs/${productKey}/reference/${
                            project.key
                        }/${btoa("/README.md")}`,
                    } as MenuItem;
                }) || [],
        });
    }

    return sortByCustomSlugMapping(allMenuItems);
}
