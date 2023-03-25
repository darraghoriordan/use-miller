import {
    Controller,
    HttpCode,
    HttpStatus,
    Get,
    Param,
    UseInterceptors,
    CacheInterceptor,
    CacheTTL,
} from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { CodeFilesService } from "../services/code-files.service.js";
import { FileMetaDto } from "../dtos/FileMetaDto.js";
import { MarkdownFileService } from "../services/markdown-files.service.js";

@UseInterceptors(CacheInterceptor)
@Controller("project-files/:productKey/open")
@ApiTags("Project Files")
export class OpenCourseFilesController {
    constructor(
        private readonly courseFileService: CodeFilesService,
        private readonly markdownFileService: MarkdownFileService
    ) {}

    @Get(":projectKey/contents/:b64Path")
    @HttpCode(HttpStatus.OK)
    @CacheTTL(10)
    @ApiOkResponse({ type: FileMetaDto })
    async getFile(
        @Param("projectKey") projectKey: string,
        @Param("b64Path") b64Path: string,
        @Param("productKey") productKey: string
    ): Promise<FileMetaDto> {
        return await this.courseFileService.getCodeFileContents(
            b64Path,
            productKey,
            projectKey
        );
    }

    @Get(":projectKey/contents-markdown/:markdownB64Path")
    @HttpCode(HttpStatus.OK)
    @CacheTTL(10)
    @ApiOkResponse({ type: FileMetaDto })
    async getMarkdownFileAsHtml(
        @Param("projectKey") projectKey: string,
        @Param("markdownB64Path") markdownB64Path: string,
        @Param("productKey") productKey: string
    ): Promise<FileMetaDto> {
        return await this.markdownFileService.getMdFileAsHtml(
            markdownB64Path,
            productKey,
            projectKey
        );
    }

    @Get(":projectKey/nearest-readme/:b64Path")
    @HttpCode(HttpStatus.OK)
    @CacheTTL(10)
    @ApiOkResponse({ type: FileMetaDto })
    async getNearestHtmlReadmeForFile(
        @Param("projectKey") projectKey: string,
        @Param("b64Path") b64Path: string,
        @Param("productKey") productKey: string
    ): Promise<FileMetaDto> {
        return await this.courseFileService.getNearestHtmlReadmeForFile(
            b64Path,
            productKey,
            projectKey
        );
    }
}
