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

const fileDirectory = path.join(process.cwd(), "src", "docs");
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
export function getSortedPostsData(): SummaryDoc[] {
    // Get file names under /posts
    const fileNames = fs.readdirSync(fileDirectory);
    const allPostsData = fileNames.map((fileName) => {
        // Remove ".md" from file name to get slug
        const slug = fileName.replace(/\.md$/, "");

        // Read markdown file as string
        const fullPath = path.join(fileDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);
        console.log(fileName, matterResult.data);

        return {
            slug,
            ...matterResult.data,
        };
    }) as unknown as SummaryDoc[];
    // Sort posts by date

    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export async function getPostData(slug: string): Promise<FullDoc> {
    const fullPath = path.join(fileDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents) as unknown as {
        data: PostMatter;
        content: any;
    };

    const markdownResult = await markdownToHtml(matterResult.content);
    // Combine the data with the id
    return {
        slug,
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

export function getAllPostIds() {
    const fileNames = fs.readdirSync(fileDirectory);

    return fileNames.map((fileName) => {
        return {
            params: {
                slug: fileName.replace(/\.md$/, ""),
            },
        };
    });
}
