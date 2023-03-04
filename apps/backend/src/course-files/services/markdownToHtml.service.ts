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
import rehypeFormat from "rehype-format";
import rehypeStringify from "rehype-stringify";
import { Injectable } from "@nestjs/common";

@Injectable()
class MarkdownToHtmlService {
    async markdownToHtml(markdown: string): Promise<string> {
        const file = await unified()
            .use(remarkParse)
            .use(gfm)
            .use(remarkRehype)
            .use(rehypePrism)
            .use(rehypeFormat)
            .use(rehypeStringify)
            .process(markdown);

        return file.toString();
    }
}

export default MarkdownToHtmlService;
