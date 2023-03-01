import { CoreModule } from "@darraghor/nest-backend-libs";
import { Module } from "@nestjs/common";
import { CourseFilesController } from "./course-files.controller";
import { CourseFilesService } from "./course-files.service";
import { CoursesMetaService } from "./courses-meta.service";
import { OpenCourseFilesController } from "./open-course-files.controller";

@Module({
    imports: [CoreModule],
    controllers: [CourseFilesController, OpenCourseFilesController],
    providers: [CourseFilesService, CoursesMetaService],
    exports: [],
})
export class CourseFilesModule {}
