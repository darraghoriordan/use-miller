import { Injectable, Logger } from "@nestjs/common";
import path from "path";
import fs from "fs";
import { FileStructureDto } from "./FileStructureDto";
import { CourseMetaDto } from "./CourseMetaDto";
import { FileMetaDto } from "./FileMetaDto";

@Injectable()
export class CourseFilesService {
    private readonly logger = new Logger(CourseFilesService.name);

    async walk(root: FileStructureDto): Promise<FileStructureDto> {
        this.logger.log("walking", root.fileLocation);
        const fileSystemNodes = await this.getSortedFileSystemNodes(
            root.fileLocation
        );
        // and parse them
        for (const d of fileSystemNodes) {
            if (this.isIgnored(d.name)) continue;

            if (d.isDirectory()) {
                this.logger.log("walking deeper...This is a folder", d.name);
                const entry: FileStructureDto = {
                    name: d.name,
                    type: "folder",
                    children: [],
                    isOpen: false,
                    fileLocation: path.join(root.fileLocation, d.name),
                };

                const walkedEntry = await this.walk(entry);
                root.children?.push(walkedEntry);
            } else if (d.isFile()) {
                const entry: FileStructureDto = {
                    name: d.name,
                    type: "file",

                    fileLocation: path.join(root.fileLocation, d.name),
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

    mapFiles = async (courseMeta: CourseMetaDto): Promise<FileStructureDto> => {
        const rootDirectory: FileStructureDto = {
            name: courseMeta.rootNodeName,
            type: "folder",
            isOpen: true,
            // eslint-disable-next-line unicorn/prefer-module
            fileLocation: courseMeta.rootLocation,
            children: [],
        };
        return await this.walk(rootDirectory);
    };

    getFileContents = async (fileLocation: string): Promise<FileMetaDto> => {
        const contents = await fs.promises.readFile(fileLocation, {
            encoding: "utf8",
            flag: "r",
        });

        return {
            contents,
            fileLocation,
        };
    };

    getPartialFileContents = async (
        fileLocation: string
    ): Promise<FileMetaDto> => {
        const contents = await fs.promises.readFile(fileLocation, {
            encoding: "utf8",
            flag: "r",
        });

        // take the first 3 lines of text
        const partialText = contents.slice(0, 200);
        return {
            contents:
                partialText +
                "\r" +
                "\r// CLIPPED @ 200 characters //" +
                "\r" +
                "// To see the full contents of each file please support development by purchasing !",
            fileLocation,
        };
    };
}
