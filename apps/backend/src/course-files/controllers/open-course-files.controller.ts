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
        const path = Buffer.from(b64Path, "base64").toString("ascii");

        return await this.courseFileService.getPartialFileContents(path);
    }
}
