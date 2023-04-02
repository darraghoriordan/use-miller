import { registerAs } from "@nestjs/config";

export default registerAs("course-files", () => ({
    basePath: process.env.COURSE_FILES_BASE_PATH,
}));
