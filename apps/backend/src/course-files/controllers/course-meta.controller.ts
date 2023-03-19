import { Controller, HttpCode, HttpStatus, Get, Param } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { CoursesMetaService } from "../services/courses-meta.service.js";
import { CourseMetaDto } from "../dtos/CourseMetaDto.js";

@Controller("project-meta/:productKey")
@ApiTags("Project Meta")
export class CourseMetaController {
    constructor(private readonly courseMetaService: CoursesMetaService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: CourseMetaDto, isArray: true })
    listAllProjects(@Param("productKey") productKey: string): CourseMetaDto[] {
        return this.courseMetaService.getAll(productKey);
    }
}
