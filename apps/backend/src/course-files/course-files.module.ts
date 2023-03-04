import { CoreModule } from "@darraghor/nest-backend-libs";
import { Module } from "@nestjs/common";
import { CourseFilesController } from "./controllers/course-files.controller.js";
import { CourseFilesService } from "./services/course-files.service.js";
import { CoursesMetaService } from "./services/courses-meta.service.js";
import MarkdownToHtmlService from "./services/markdownToHtml.service.js";
import { OpenCourseFilesController } from "./controllers/open-course-files.controller.js";
import { CourseMetaController } from "./controllers/course-meta.controller.js";

@Module({
    imports: [CoreModule],
    controllers: [
        CourseFilesController,
        OpenCourseFilesController,
        CourseMetaController,
    ],
    providers: [CourseFilesService, CoursesMetaService, MarkdownToHtmlService],
    exports: [],
})
export class CourseFilesModule {}
