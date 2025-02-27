/* eslint-disable @typescript-eslint/naming-convention */

import { Injectable, NotFoundException } from "@nestjs/common";
import path from "path";
import fs from "fs";
import { FileMetaDto } from "../dtos/FileMetaDto.js";
import MarkdownToHtmlService from "./markdownToHtml.service.js";
import { CoursesMetaService } from "./courses-meta.service.js";
import PathMapperService from "./pathMapper.service.js";
import matter, { GrayMatterFile } from "gray-matter";
import { FileVisibilityControlGuard } from "./file-visibility-guard.service.js";
import { RequestUser } from "@darraghor/nest-backend-libs";

export interface MatterResult {
    data: Record<string, unknown>;
    content: string;
    excerpt: string;
}
export const firstQuarter = (
    file: GrayMatterFile<string>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    options: never,
): void => {
    const lines = file.content.split("\n");
    // for long docs a quarter is too much but less than 20 is too little
    const amountToTake = Math.max(
        Math.min(Math.floor(lines.length / 4), 20),
        20,
    );
    const firstQuarter = lines.slice(0, amountToTake);
    file.excerpt = firstQuarter.join("\n");
};

@Injectable()
export class MarkdownFileService {
    constructor(
        private readonly markdownToHtmlService: MarkdownToHtmlService,
        private readonly coursesMetaService: CoursesMetaService,
        private readonly pathMapperService: PathMapperService,
        private readonly fileVisibilityGuard: FileVisibilityControlGuard,
    ) {}

    //private readonly logger = new Logger(CourseFilesService.name);

    getMdFileAsHtml = async (
        b64Path: string,
        productKey: string,
        projectKey: string,
        user?: RequestUser,
    ): Promise<FileMetaDto> => {
        const product = this.coursesMetaService.getOneProduct(productKey);
        const projectMeta = product.projectMeta.find(
            (p) => projectKey === p.key,
        );
        if (!projectMeta) {
            throw new NotFoundException("No project found");
        }

        const fileLocation = this.pathMapperService.mapBase64ToAbsolutePath(
            b64Path,
            projectMeta.rootLocation,
        );

        if (!fileLocation) {
            throw new NotFoundException("No file found");
        }
        const fileContents = fs.readFileSync(fileLocation, "utf8");
        const clippedMessage =
            "\n\n ----------------------------" +
            "\n> # Purchase Notice" +
            "\n> Hi there! Thanks so much for checking this out!" +
            "\n>" +
            "\n> **Please note:** There's more content here but file viewing is clipped unless you have purchased." +
            "\n>" +
            "\n>As a demo, the full contents of the following path link are visible." +
            "\n>" +
            "\n> " +
            `Click to open: [${projectMeta.demoFileLinkText}](${projectMeta.demoFileLinkHref})`;

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(
            { content: fileContents },
            {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
                excerpt: firstQuarter as any,
            },
        ) as MatterResult;

        const shouldShowFullFile = this.fileVisibilityGuard.shouldShowFullFile({
            fileLocation,
            demoPaths: projectMeta.demoPaths,
            productKey,
            isOpenSourceProject: projectMeta.isOpenSource,
            lengthInLines: fileContents.split("\n").length,
            maximumLines: 30,
            activeSubscriptionProductKeys: user?.activeSubscriptionProductKeys,
        });

        const htmlData = await this.markdownToHtmlService.markdownToHtml(
            shouldShowFullFile
                ? matterResult.content
                : matterResult.excerpt + clippedMessage,
            fileLocation,
        );

        return {
            contents: htmlData,
            fileName: path.basename(fileLocation),
            fileLocation: b64Path,
            nearestReadmeLocation: b64Path,
        };
    };

    getFileContents = async (fileLocation: string): Promise<string> => {
        return fs.promises.readFile(fileLocation, {
            encoding: "utf8",
            flag: "r",
        });
    };
}
