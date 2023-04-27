/* eslint-disable sonarjs/no-duplicate-string */
import { Injectable, NotFoundException } from "@nestjs/common";
import path from "path";
import fs from "fs";
import { FileStructureDto } from "../dtos/FileStructureDto.js";
import { FileMetaDto } from "../dtos/FileMetaDto.js";
import { CoursesMetaService } from "./courses-meta.service.js";
import PathMapperService from "./pathMapper.service.js";
import { CourseMetaDto } from "../dtos/CourseMetaDto.js";
import { MarkdownFileService } from "./markdown-files.service.js";
import { FileVisibilityControlGuard } from "./file-visibility-guard.service.js";
import { RequestUser } from "@darraghor/nest-backend-libs";

@Injectable()
export class CodeFilesService {
    constructor(
        private readonly markdownFileService: MarkdownFileService,
        private readonly coursesMetaService: CoursesMetaService,
        private readonly pathMapperService: PathMapperService,
        private readonly fileVisibilityGuard: FileVisibilityControlGuard
    ) {}

    //private readonly logger = new Logger(CourseFilesService.name);

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

    mapFiles = async (
        productKey: string,
        projectKey: string
    ): Promise<FileStructureDto> => {
        const projectMeta = this.coursesMetaService.getOneProject(
            productKey,
            projectKey
        );

        const rootDirectory: FileStructureDto = {
            name: projectMeta.rootNodeName,
            type: "folder",
            isOpen: true,
            // eslint-disable-next-line unicorn/prefer-module
            fileLocation: "", // this is the root of the course
            children: [],
        };
        return await this.walk(rootDirectory, projectMeta);
    };

    getNearestHtmlReadmeForFile = async (
        b64Path: string,
        productKey: string,
        projectKey: string
    ): Promise<FileMetaDto> => {
        const projectMeta = this.coursesMetaService.getOneProject(
            productKey,
            projectKey
        );
        const fileLocation = this.pathMapperService.mapBase64ToAbsolutePath(
            b64Path,
            projectMeta.rootLocation
        );

        const readmePath = this.findNearestReadme(fileLocation);
        if (!readmePath) {
            throw new NotFoundException("No readme found for this file");
        }
        return this.markdownFileService.getMdFileAsHtml(
            readmePath,
            productKey,
            projectKey
        );
    };

    getNearestReadMePathForFile = (
        b64Path: string,
        productKey: string,
        projectKey: string
    ): string | undefined => {
        const projectMeta = this.coursesMetaService.getOneProject(
            productKey,
            projectKey
        );
        const fileLocation = this.pathMapperService.mapBase64ToAbsolutePath(
            b64Path,
            projectMeta.rootLocation
        );

        return this.findNearestReadme(fileLocation);
    };

    readFromDisk = async (fileLocation: string): Promise<string> => {
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

    getCodeFileContents = async (
        b64Path: string,
        productKey: string,
        projectKey: string,
        user?: RequestUser
    ): Promise<FileMetaDto> => {
        const product = this.coursesMetaService.getOneProduct(productKey);
        const projectMeta = product.projectMeta.find(
            (p) => projectKey === p.key
        );
        if (!projectMeta) {
            throw new NotFoundException("No project found");
        }
        const fileLocation = this.pathMapperService.mapBase64ToAbsolutePath(
            b64Path,
            projectMeta.rootLocation
        );
        const nearestReadme =
            this.findNearestReadme(fileLocation) || "README.md";

        const fileContents = await this.readFromDisk(fileLocation);
        const fileName = path.basename(fileLocation);
        const nearestReadmeLocation =
            this.pathMapperService.mapPathToRelativeBase64(
                nearestReadme,
                projectMeta.rootLocation
            );
        if (
            this.fileVisibilityGuard.shouldShowFullFile({
                productKey,
                demoPaths: projectMeta.demoPaths,
                fileLocation,
                lengthInLines: fileContents?.split("\n").length,
                activeSubscriptionProductKeys:
                    user?.activeSubscriptionProductKeys,
                maximumLines: 15,
            })
        ) {
            return {
                contents: fileContents,
                fileLocation: b64Path,
                fileName,
                nearestReadmeLocation,
            };
        }
        // otherwise return the trimmed file(s)
        return {
            contents: this.trimCodeFile(
                fileContents,
                projectMeta.demoFileLinkHref
            ),
            fileLocation: b64Path,
            fileName,
            nearestReadmeLocation,
        };
    };

    trimCodeFile = (contents: string, demoUrl: string): string => {
        const lines = contents?.split("\n");
        const amountToTake = Math.max(
            Math.min(Math.floor(lines.length / 4), 20),
            12
        );
        const firstQuarter = lines.slice(0, amountToTake);

        return (
            firstQuarter.join("\n") +
            "\n" +
            "\n#######################################################" +
            "\n#                       NOTICE                         " +
            "\n#######################################################" +
            "\n" +
            "\n# File viewing is clipped unless you have purchased " +
            "\n" +
            "# To see the full contents of each file and get the full source code" +
            "\n" +
            "# please support development by purchasing." +
            "\n" +
            "# As an demo, the full file contents are available at the following path" +
            "\n" +
            `# ${demoUrl}`
        );
    };
}
