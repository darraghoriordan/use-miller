import { CoreConfigModule, CoreModule } from "@darraghor/nest-backend-libs";
import { Module } from "@nestjs/common";
import { CourseFilesController } from "./controllers/course-files.controller.js";
import { CourseFilesService } from "./services/course-files.service.js";
import { CoursesMetaService } from "./services/courses-meta.service.js";
import MarkdownToHtmlService from "./services/markdownToHtml.service.js";
import { OpenCourseFilesController } from "./controllers/open-course-files.controller.js";
import { CourseMetaController } from "./controllers/course-meta.controller.js";
import PathMapperService from "./services/pathMapper.service.js";

@Module({
    imports: [CoreModule, CoreConfigModule],
    controllers: [
        CourseFilesController,
        OpenCourseFilesController,
        CourseMetaController,
    ],
    providers: [
        CourseFilesService,
        CoursesMetaService,
        MarkdownToHtmlService,
        PathMapperService,
    ],
    exports: [],
})
export class CourseFilesModule {}
