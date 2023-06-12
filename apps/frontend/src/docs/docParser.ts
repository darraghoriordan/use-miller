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
import { Compatible, VFile } from "vfile";

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
        ?.split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}
export function sortByOrder(a: SummaryDoc, b: SummaryDoc): number {
    return a.order - b.order;
}
export function getSortedPostsData(): {
    productKey: string;
    sections: Section[];
}[] {
    // Get file names for the sections
    // expectation here is a structure like
    //my-product
    // /my-section
    //   /my-page.md
    //   /my-other-page.md
    //   /folders-are-ignored-here
    // /my-other-section
    // ...
    const productLevelDirItems = fs.readdirSync(docContentDirectory, {
        withFileTypes: true,
    });
    // get a list of the directories at the top level
    const productDirectories = productLevelDirItems.filter((dirEntry) =>
        dirEntry.isDirectory()
    );
    const result = [];
    for (const productDirectory of productDirectories) {
        const productContentDirectory = path.join(
            docContentDirectory,
            productDirectory.name
        );
        // now get the list of sections for this product
        const sectionLevelDirItems = fs.readdirSync(productContentDirectory, {
            withFileTypes: true,
        });
        const sectionDirectories = sectionLevelDirItems.filter((dirEntry) =>
            dirEntry.isDirectory()
        );
        const allPostSections = sectionDirectories.map((sectionDirectory) => {
            // section path
            const sectionPath = path.join(
                productContentDirectory,
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
        result.push({
            productKey: productDirectory.name,
            sections: allPostSections,
        });
    }

    return result;
}

export async function getSinglePost({
    slug,
    sectionSlug,
    productKey,
}: {
    slug?: string;
    sectionSlug?: string;
    productKey?: string;
}): Promise<FullDoc> {
    // if people are messing about with urls, just send them to the getting started page
    // can improve this later
    if (
        [slug, sectionSlug, productKey].some((x) => {
            return !x || x === "index" || x === "" || x === "/";
        })
    ) {
        productKey = "miller-start";
        sectionSlug = "get-started";
        slug = "quick-start";
    }

    const fullPath = path.join(
        docContentDirectory,
        productKey!,
        sectionSlug!,
        `${slug}.md`
    );

    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents) as unknown as {
        data: PostMatter;
        content: any;
    };

    const markdownResult = await markdownToHtml(matterResult.content, fullPath);
    // Combine the data with the id
    return {
        slug: slug!,
        html: markdownResult,
        ...matterResult.data,
    };
}

export async function markdownToHtml(
    markdownSection: any,
    filePath: string
): Promise<string> {
    const inFile = new VFile({
        path: filePath,
        value: markdownSection,
    });

    const outFile = await unified()
        .use(remarkParse)
        .use(gfm)
        .use(remarkEmbedImages)
        .use(remarkRehype)
        .use(rehypePrism)
        .use(rehypeFormat)
        .use(rehypeStringify)
        .process(inFile as any);

    return outFile.toString();
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
    const allPostProducts = getSortedPostsData();

    const paths = [];
    for (const product of allPostProducts) {
        for (const section of product.sections) {
            // skip reference section (this is dynamically generated)
            if (section.sectionSlug === "reference") {
                continue;
            }
            for (const page of section.pages) {
                paths.push({
                    params: {
                        productKey: product.productKey,
                        section: section.sectionSlug,
                        slug: page.slug,
                    },
                });
            }
        }
    }
    return {
        paths,
        fallback: false,
    };
}
