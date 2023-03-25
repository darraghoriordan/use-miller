import {
    DefaultAuthGuard,
    RequestWithUser,
} from "@darraghor/nest-backend-libs";
import {
    Controller,
    UseGuards,
    HttpCode,
    HttpStatus,
    Get,
    Param,
    Request,
    UseInterceptors,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { CodeFilesService } from "../services/code-files.service.js";
import { FileMetaDto } from "../dtos/FileMetaDto.js";
import { FileStructureDto } from "../dtos/FileStructureDto.js";
import { MarkdownFileService } from "../services/markdown-files.service.js";
import UserDiscriminatedCacheInterceptor from "../UserDiscriminatedCacheInterceptor.js";

@Controller("project-files/:productKey")
@UseInterceptors(UserDiscriminatedCacheInterceptor)
@ApiTags("Project Files")
export class CourseFilesController {
    constructor(
        private readonly courseFileService: CodeFilesService,
        private readonly markdownFileService: MarkdownFileService
    ) {}

    @Get(":projectKey")
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: FileStructureDto })
    async listProjectFiles(
        @Param("projectKey") projectKey: string,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        @Param("productKey") productKey: string
    ): Promise<FileStructureDto> {
        return await this.courseFileService.mapFiles(productKey, projectKey);
    }

    @UseGuards(DefaultAuthGuard)
    @ApiBearerAuth()
    @Get(":projectKey/contents/:b64Path")
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: FileMetaDto })
    async getFile(
        @Param("projectKey") projectKey: string,
        @Param("productKey") productKey: string,
        @Param("b64Path") b64Path: string,
        @Request() request: RequestWithUser
    ): Promise<FileMetaDto> {
        // eslint-disable-next-line sonarjs/no-small-switch

        return await this.courseFileService.getCodeFileContents(
            b64Path,
            productKey,
            projectKey,
            request.user
        );
    }

    @UseGuards(DefaultAuthGuard)
    @ApiBearerAuth()
    @Get(":projectKey/contents-markdown/:markdownB64Path")
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: FileMetaDto })
    async getMarkdownFileAsHtml(
        @Param("projectKey") projectKey: string,
        @Param("productKey") productKey: string,
        @Param("markdownB64Path") markdownB64Path: string,
        @Request() request: RequestWithUser
    ): Promise<FileMetaDto> {
        return await this.markdownFileService.getMdFileAsHtml(
            markdownB64Path,
            productKey,
            projectKey,
            request.user
        );
    }
}
