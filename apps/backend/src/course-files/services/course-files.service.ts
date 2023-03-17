/* eslint-disable sonarjs/no-duplicate-string */
import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import path from "path";
import fs from "fs";
import { FileStructureDto } from "../dtos/FileStructureDto.js";
import { FileMetaDto } from "../dtos/FileMetaDto.js";
import MarkdownToHtmlService from "./markdownToHtml.service.js";
import { CoursesMetaService } from "./courses-meta.service.js";
import PathMapperService from "./pathMapper.service.js";
import { CourseMetaDto } from "../dtos/CourseMetaDto.js";
import { minimatch } from "minimatch";
import { CoreConfigurationService } from "@darraghor/nest-backend-libs";
@Injectable()
export class CourseFilesService {
    constructor(
        private readonly markdownToHtmlService: MarkdownToHtmlService,
        private readonly coursesMetaService: CoursesMetaService,
        private readonly pathMapperService: PathMapperService,
        private readonly coreConfig: CoreConfigurationService
    ) {}

    private readonly logger = new Logger(CourseFilesService.name);

    async walk(
        root: FileStructureDto,
        courseMeta: CourseMetaDto
    ): Promise<FileStructureDto> {
        const absolutePath = this.pathMapperService.mapBase64ToAbsolutePath(
            root.fileLocation,
            courseMeta.rootLocation
        );

        const fileSystemNodes = await this.getSortedFileSystemNodes(
            absolutePath
        );
        // and parse them
        for (const d of fileSystemNodes) {
            if (this.isIgnored(d.name)) continue;

            const itemPathBase64 =
                this.pathMapperService.mapPathToRelativeBase64(
                    path.join(absolutePath, d.name),
                    courseMeta.rootLocation
                );
            if (d.isDirectory()) {
                const entry: FileStructureDto = {
                    name: d.name,
                    type: "folder",
                    children: [],
                    isOpen: false,
                    fileLocation: itemPathBase64,
                };

                const walkedEntry = await this.walk(entry, courseMeta);
                root.children?.push(walkedEntry);
            } else if (d.isFile()) {
                const entry: FileStructureDto = {
                    name: d.name,
                    type: "file",

                    fileLocation: itemPathBase64,
                };
                root.children?.push(entry);
            }
        }

        return root;
    }
    isIgnored(name: string) {
        const ignores = [
            "node_modules",
            ".next",
            ".docker-compose",
            "dist",
            ".jest_cache",
            ".git",
            ".env",
            ".env.local",
            ".DS_Store",
        ];
        return ignores.includes(name);
    }

    getSortedFileSystemNodes = async (location: string) => {
        const fileSystemNodes = await fs.promises.opendir(location);
        // sort all the folders up to the top
        const awaitedDirectories = [];
        for await (const fsNode of fileSystemNodes) {
            awaitedDirectories.push(fsNode);
        }
        awaitedDirectories.sort((a, b) => {
            if (!a.isFile() && b.isFile()) return -1;
            if (a.isFile() && !b.isFile()) return 1;
            // if they are the same sort alphabetically
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;

            return 0;
        });
        return awaitedDirectories;
    };

    mapFiles = async (courseName: string): Promise<FileStructureDto> => {
        const courseMeta = this.coursesMetaService.getOne(courseName);

        const rootDirectory: FileStructureDto = {
            name: courseMeta.rootNodeName,
            type: "folder",
            isOpen: true,
            // eslint-disable-next-line unicorn/prefer-module
            fileLocation: "", // this is the root of the course
            children: [],
        };
        return await this.walk(rootDirectory, courseMeta);
    };

    getNearestHtmlReadmeForFile = async (
        b64Path: string,
        courseName: string
    ): Promise<FileMetaDto> => {
        const courseMeta = this.coursesMetaService.getOne(courseName);
        const fileLocation = this.pathMapperService.mapBase64ToAbsolutePath(
            b64Path,
            courseMeta.rootLocation
        );

        const readmePath = this.findNearestReadme(fileLocation);
        if (!readmePath) {
            throw new NotFoundException("No readme found for this file");
        }

        const htmlData = await this.markdownToHtmlService.markdownToHtml(
            readmePath
        );
        return {
            contents: htmlData,
            fileName: path.basename(fileLocation),
            fileLocation: b64Path,
            nearestReadmeLocation: b64Path,
        };
    };
    getNearestReadMePathForFile = (
        b64Path: string,
        courseName: string
    ): string | undefined => {
        const courseMeta = this.coursesMetaService.getOne(courseName);
        const fileLocation = this.pathMapperService.mapBase64ToAbsolutePath(
            b64Path,
            courseMeta.rootLocation
        );

        return this.findNearestReadme(fileLocation);
    };

    getFileAsMarkdown = async (
        b64Path: string,
        courseName: string
    ): Promise<FileMetaDto> => {
        const courseMeta = this.coursesMetaService.getOne(courseName);
        const fileLocation = this.pathMapperService.mapBase64ToAbsolutePath(
            b64Path,
            courseMeta.rootLocation
        );

        if (!fileLocation) {
            throw new NotFoundException("No file found");
        }

        const htmlData = await this.markdownToHtmlService.markdownToHtml(
            fileLocation
        );
        this.logger.log({ b64Path, courseMeta }, "nearest readme");
        return {
            contents: htmlData,
            fileName: path.basename(fileLocation),
            fileLocation: b64Path,
            nearestReadmeLocation: b64Path,
        };
    };

    getCourseFileContents = async (
        b64Path: string,
        courseName: string
    ): Promise<FileMetaDto> => {
        const courseMeta = this.coursesMetaService.getOne(courseName);
        const fileLocation = this.pathMapperService.mapBase64ToAbsolutePath(
            b64Path,
            courseMeta.rootLocation
        );
        const nearestReadme =
            this.findNearestReadme(fileLocation) || "README.md";
        this.logger.log({ nearestReadme, courseMeta }, "nearest readme");
        return {
            contents: await this.getFileContents(fileLocation),
            fileLocation: b64Path,
            fileName: path.basename(fileLocation),
            nearestReadmeLocation:
                this.pathMapperService.mapPathToRelativeBase64(
                    nearestReadme,
                    courseMeta.rootLocation
                ),
        };
    };

    getFileContents = async (fileLocation: string): Promise<string> => {
        return fs.promises.readFile(fileLocation, {
            encoding: "utf8",
            flag: "r",
        });
    };

    findNearestReadme = (fileLocation: string): string | undefined => {
        const root = path.dirname(fileLocation);
        const filename = "README.md";

        function findFile(
            directory: string,
            filename: string
        ): string | undefined {
            const file = path.join(directory, filename);

            try {
                if (fs.statSync(file).isFile()) return file;

                return nextLevelUp();
            } catch {
                return nextLevelUp();
            }

            function nextLevelUp() {
                if (directory === path.resolve("/")) return;
                return findFile(path.dirname(directory), filename);
            }
        }

        return findFile(root, filename);
    };

    shouldShowFullFile = (fileLocation: string): boolean => {
        const globs = [
            "**/*.md",
            "**/*.html",
            "**/*.css",
            "**/src/stripe-client/services/**",
        ];
        // eslint-disable-next-line sonarjs/prefer-immediate-return
        const isMatch = globs.some((g) => minimatch(fileLocation, g));
        return isMatch;
    };
    getPartialFileContents = async (
        b64Path: string,
        courseName: string
    ): Promise<FileMetaDto> => {
        const courseMeta = this.coursesMetaService.getOne(courseName);
        const fileLocation = this.pathMapperService.mapBase64ToAbsolutePath(
            b64Path,
            courseMeta.rootLocation
        );

        const contents = await fs.promises.readFile(fileLocation, {
            encoding: "utf8",
            flag: "r",
        });
        const nearestReadme =
            this.findNearestReadme(fileLocation) || "README.md";
        const fileName = path.basename(fileLocation);
        const nearestReadmeLocation =
            this.pathMapperService.mapPathToRelativeBase64(
                nearestReadme,
                courseMeta.rootLocation
            );
        if (this.shouldShowFullFile(fileLocation)) {
            return {
                contents,
                fileLocation: b64Path,
                fileName,
                nearestReadmeLocation,
            };
        }

        // take the first 3 lines of text
        let demoText = contents;
        if (contents.length > 200) {
            demoText =
                contents.slice(0, 200) +
                "\r" +
                "\r// File viewing is clipped unless you have purchased //" +
                "\r" +
                "// To see the full contents of each file please support development by purchasing //" +
                "\r" +
                "// As an example, the full contents of Stripe services are available at the following path //" +
                "\r" +
                "// (ctrl+click or cmd+click to open in new window) //" +
                "\r" +
                `// ${this.coreConfig.frontEndAppUrl}/open/code-doc/nestjs-backend-libs/L3NyYy9zdHJpcGUtY2xpZW50L3NlcnZpY2VzL3F1ZXVlZC1wYXltZW50LWV2ZW50LmhhbmRsZXIudHM= //`;
        }

        return {
            contents: demoText,
            fileName,
            fileLocation: b64Path,
            nearestReadmeLocation,
        };
    };
}
