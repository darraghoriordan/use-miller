/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// TODO: @mapbox/rehype-prism does not have typescript definition
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import rehypePrism from "@mapbox/rehype-prism";
import { unified } from "unified";
import gfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkEmbedImages from "remark-embed-images";
import rehypeFormat from "rehype-format";
import rehypeStringify from "rehype-stringify";
import { Injectable } from "@nestjs/common";
import { VFile } from "vfile";

@Injectable()
class MarkdownToHtmlService {
    async markdownToHtml(
        markdownSection: string,
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
}

export default MarkdownToHtmlService;
