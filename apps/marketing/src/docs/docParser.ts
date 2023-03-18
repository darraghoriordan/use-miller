// TODO: @mapbox/rehype-prism does not have typescript definition
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import rehypePrism from "@mapbox/rehype-prism";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import gfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkEmbedImages from "remark-embed-images";
import rehypeFormat from "rehype-format";
import rehypeStringify from "rehype-stringify";

const docContentDirectory = path.join(
    process.cwd(),
    "src",
    "docs",
    "page-content"
);
export type Section = {
    sectionDisplayName: string;
    sectionSlug: string;
    pages: SummaryDoc[];
};
export type SummaryDoc = PostMatter & {
    slug: string;
};
export type PostMatter = {
    title: string;
    date: string;
    section: string;
    order: number;
};
export type FullDoc = SummaryDoc & {
    html: string;
};

export function toCapitalCase(str: string): string {
    return str
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}
export function sortByOrder(a: SummaryDoc, b: SummaryDoc): number {
    return a.order - b.order;
}
export function getSortedPostsData(): Section[] {
    // Get file names for the sections
    // expectation here is a structure like
    // /my-section
    //   /my-page.md
    //   /my-other-page.md
    //   /folders-are-ignored-here
    // /my-other-section
    // ...
    const sectionLevelDirItems = fs.readdirSync(docContentDirectory, {
        withFileTypes: true,
    });
    // get a list of the directories at the top level
    const sectionDirectories = sectionLevelDirItems.filter((dirEntry) =>
        dirEntry.isDirectory()
    );
    const allPostSections = sectionDirectories.map((sectionDirectory) => {
        // section path
        const sectionPath = path.join(
            docContentDirectory,
            sectionDirectory.name
        );
        const sectionFiles = fs
            .readdirSync(sectionPath, {
                withFileTypes: true,
            })
            .filter((dirEntry) => dirEntry.isFile());
        return {
            sectionDisplayName: toCapitalCase(
                sectionDirectory.name.replace(/-/g, " ")
            ),
            sectionSlug: sectionDirectory.name,
            pages: sectionFiles
                .map((fileName) => {
                    // Remove ".md" from file name to get slug
                    const slug = fileName.name.replace(/\.md$/, "");

                    // Read markdown file as string
                    const contentDocumentPath = path.join(
                        sectionPath,
                        fileName.name
                    );

                    const fileContents = fs.readFileSync(
                        contentDocumentPath,
                        "utf8"
                    );

                    // Use gray-matter to parse the post metadata section
                    const matterResult = matter(fileContents);

                    return {
                        slug,
                        ...matterResult.data,
                    } as SummaryDoc;
                })
                .sort(sortByOrder),
        };
    });
    console.log(allPostSections);
    return allPostSections;
}

export async function getSinglePost({
    slug,
    sectionSlug,
}: {
    slug?: string;
    sectionSlug?: string;
}): Promise<FullDoc> {
    // if people are messing about with urls, just send them to the getting started page
    // can improve this later
    if (
        !sectionSlug ||
        sectionSlug === "index" ||
        sectionSlug === "" ||
        sectionSlug === "/"
    ) {
        sectionSlug = "get-started";
        slug = "quick-start";
    }
    if (!slug || slug === "index" || slug === "" || slug === "/") {
        sectionSlug = "get-started";
        slug = "quick-start";
    }

    const fullPath = path.join(docContentDirectory, sectionSlug, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents) as unknown as {
        data: PostMatter;
        content: any;
    };

    const markdownResult = await markdownToHtml(matterResult.content);
    // Combine the data with the id
    return {
        slug: slug!,
        html: markdownResult,
        ...matterResult.data,
    };
}

export async function markdownToHtml(markdownSection: any): Promise<string> {
    const file = await unified()
        .use(remarkParse)
        .use(gfm)
        .use(remarkEmbedImages)
        .use(remarkRehype)
        .use(rehypePrism)
        .use(rehypeFormat)
        .use(rehypeStringify)
        .process(markdownSection);

    return file.toString();
}

export async function getStaticDocsPageSlugs(): Promise<{
    paths: {
        params: {
            slug: string;
            section: string;
        };
    }[];
    fallback: boolean;
}> {
    const allPostSections = getSortedPostsData();

    const paths = [];
    for (const section of allPostSections) {
        // skip reference section
        if (section.sectionSlug === "reference") {
            continue;
        }
        for (const page of section.pages) {
            paths.push({
                params: {
                    section: section.sectionSlug,
                    slug: page.slug,
                },
            });
        }
    }

    return {
        paths,
        fallback: false,
    };
}
