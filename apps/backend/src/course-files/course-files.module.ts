import { CoreModule } from "@darraghor/nest-backend-libs";
import { Module } from "@nestjs/common";
import { CourseFilesController } from "./course-files.controller";
import { CourseFilesService } from "./course-files.service";
import { CoursesMetaService } from "./courses-meta.service";

@Module({
    imports: [CoreModule],
    controllers: [CourseFilesController],
    providers: [CourseFilesService, CoursesMetaService],
    exports: [],
})
export class CourseFilesModule {}
