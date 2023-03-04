import { Controller, HttpCode, HttpStatus, Get } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { CoursesMetaService } from "../services/courses-meta.service.js";
import { CourseMetaDto } from "../dtos/CourseMetaDto.js";

@Controller("course-meta")
@ApiTags("Course Meta")
export class CourseMetaController {
    constructor(private readonly courseMetaService: CoursesMetaService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ type: CourseMetaDto, isArray: true })
    listAllCourses(): CourseMetaDto[] {
        return this.courseMetaService.getAll();
    }
}
