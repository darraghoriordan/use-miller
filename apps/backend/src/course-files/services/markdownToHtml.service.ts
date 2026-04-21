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
        filePath: string,
    ): Promise<string> {
        const inFile = new VFile({
            path: filePath,
            value: markdownSection,
        });

        const outFile = await unified()
            .use(remarkParse as never)
            .use(gfm as never)
            .use(remarkEmbedImages as never)
            .use(remarkRehype as never)
            .use(rehypePrism as never)
            .use(rehypeFormat as never)
            .use(rehypeStringify)

            .process(inFile);
        return outFile.toString();
    }
}

export default MarkdownToHtmlService;
