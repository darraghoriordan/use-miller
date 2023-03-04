import { DefaultAuthGuard } from "@darraghor/nest-backend-libs";
import {
    Controller,
    UseGuards,
    HttpCode,
    HttpStatus,
    Get,
    Param,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";

import { CourseFilesService } from "../services/course-files.service.js";
import { CoursesMetaService } from "../services/courses-meta.service.js";
import { FileMetaDto } from "../dtos/FileMetaDto.js";
import { FileStructureDto } from "../dtos/FileStructureDto.js";

@Controller("course-files")
@ApiTags("Course Files")
export class CourseFilesController {
    constructor(
        private readonly courseFileService: CourseFilesService,
        private readonly courseMetaService: CoursesMetaService
    ) {}

    @Get(":courseName")
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: FileStructureDto })
    async listCourseFiles(
        @Param("courseName") courseName: string
    ): Promise<FileStructureDto> {
        // eslint-disable-next-line sonarjs/no-small-switch
        const courseMeta = this.courseMetaService.getOne(courseName);

        return await this.courseFileService.mapFiles(courseMeta);
    }

    @UseGuards(DefaultAuthGuard)
    @ApiBearerAuth()
    @Get(":courseName/contents/:b64Path")
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: FileMetaDto })
    async getFile(
        @Param("courseName") courseName: string,
        @Param("b64Path") b64Path: string
    ): Promise<FileMetaDto> {
        const path = Buffer.from(b64Path, "base64").toString("ascii");
        // eslint-disable-next-line sonarjs/no-small-switch

        return await this.courseFileService.getFileContents(path);
    }
}
