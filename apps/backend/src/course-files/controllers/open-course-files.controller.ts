import { Controller, HttpCode, HttpStatus, Get, Param } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { CourseFilesService } from "../services/course-files.service.js";
import { FileMetaDto } from "../dtos/FileMetaDto.js";

@Controller("course-files/open")
@ApiTags("Course Files")
export class OpenCourseFilesController {
    constructor(private readonly courseFileService: CourseFilesService) {}

    @Get(":courseName/contents/:b64Path")
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: FileMetaDto })
    async getFile(
        @Param("courseName") courseName: string,
        @Param("b64Path") b64Path: string
    ): Promise<FileMetaDto> {
        return await this.courseFileService.getPartialFileContents(
            b64Path,
            courseName
        );
    }

    @Get(":courseName/contents-markdown/:markdownB64Path")
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: FileMetaDto })
    async getMarkdownFileAsHtml(
        @Param("courseName") courseName: string,
        @Param("markdownB64Path") markdownB64Path: string
    ): Promise<FileMetaDto> {
        return await this.courseFileService.getFileAsMarkdown(
            markdownB64Path,
            courseName
        );
    }

    @Get(":courseName/nearest-readme/:b64Path")
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: FileMetaDto })
    async getNearestHtmlReadmeForFile(
        @Param("courseName") courseName: string,
        @Param("b64Path") b64Path: string
    ): Promise<FileMetaDto> {
        return await this.courseFileService.getNearestHtmlReadmeForFile(
            b64Path,
            courseName
        );
    }
}
