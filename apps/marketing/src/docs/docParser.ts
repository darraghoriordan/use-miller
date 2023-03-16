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
import { getAllCourses } from "@use-miller/shared-frontend-tooling";
import { GetStaticPaths } from "next";

const fileDirectory = path.join(process.cwd(), "src", "docs", "page-content");
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
export const defaultArticleSlug = "get-started-installation";
export function getSortedPostsData(): SummaryDoc[] {
    // Get file names under /posts
    const fileNames = fs.readdirSync(fileDirectory, { withFileTypes: true });
    const allPostsData = fileNames
        .filter((dirEntry) => dirEntry.isFile())
        .map((fileName) => {
            // Remove ".md" from file name to get slug
            const slug = fileName.name.replace(/\.md$/, "");

            // Read markdown file as string
            const fullPath = path.join(fileDirectory, fileName.name);

            const fileContents = fs.readFileSync(fullPath, "utf8");

            // Use gray-matter to parse the post metadata section
            const matterResult = matter(fileContents);

            return {
                slug,
                ...matterResult.data,
            };
        }) as unknown as SummaryDoc[];
    // Sort posts by date

    return allPostsData.sort((a, b) => {
        if (a.section < b.section) {
            return 1;
        } else {
            return -1;
        }
    });
}

export async function getSinglePost(slug?: string): Promise<FullDoc> {
    let renderSlug = slug;
    if (!slug || slug === "index" || slug === "" || slug === "/") {
        renderSlug = defaultArticleSlug;
    }

    const fullPath = path.join(fileDirectory, `${renderSlug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents) as unknown as {
        data: PostMatter;
        content: any;
    };

    const markdownResult = await markdownToHtml(matterResult.content);
    // Combine the data with the id
    return {
        slug: renderSlug!,
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
        };
    }[];
    fallback: boolean;
}> {
    const allPosts = getSortedPostsData();

    const paths = [
        ...allPosts.map((post) => {
            return {
                params: {
                    slug: post.slug,
                },
            };
        }),
    ];

    return {
        paths,
        fallback: false,
    };
}
