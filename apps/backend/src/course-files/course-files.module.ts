import { CoreConfigModule, CoreModule } from "@darraghor/nest-backend-libs";
import { Module } from "@nestjs/common";
import { CourseFilesController } from "./controllers/course-files.controller.js";
import { CodeFilesService } from "./services/code-files.service.js";
import { CoursesMetaService } from "./services/courses-meta.service.js";
import MarkdownToHtmlService from "./services/markdownToHtml.service.js";
import { OpenCourseFilesController } from "./controllers/open-course-files.controller.js";
import { CourseMetaController } from "./controllers/course-meta.controller.js";
import PathMapperService from "./services/pathMapper.service.js";
import { MarkdownFileService } from "./services/markdown-files.service.js";
import { FileVisibilityControlGuard } from "./services/file-visibility-guard.service.js";
import UserDiscriminatedCacheInterceptor from "./UserDiscriminatedCacheInterceptor.js";
import { CourseFilesConfigurationService } from "./config/CourseFilesConfigurationService.js";
import { ConfigModule } from "@nestjs/config";
import configVariables from "./config/CourseFilesConfigurationVariables.js";

@Module({
    imports: [
        CoreModule,
        CoreConfigModule,
        ConfigModule.forFeature(configVariables),
    ],
    controllers: [
        CourseFilesController,
        OpenCourseFilesController,
        CourseMetaController,
    ],
    providers: [
        CodeFilesService,
        CoursesMetaService,
        MarkdownToHtmlService,
        PathMapperService,
        MarkdownFileService,
        FileVisibilityControlGuard,
        UserDiscriminatedCacheInterceptor,
        CourseFilesConfigurationService,
    ],
    exports: [],
})
export class CourseFilesModule {}
