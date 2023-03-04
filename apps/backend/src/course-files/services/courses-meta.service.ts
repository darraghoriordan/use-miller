import { Injectable } from "@nestjs/common";
import path from "path";
import { CourseMetaDto } from "../dtos/CourseMetaDto.js";
import url from "url";

const courseMeta: CourseMetaDto[] = [
    {
        key: "miller",
        rootNodeName: "USE-MILLER",
        name: "Use Miller",
        color: "green",

        rootLocation: path.join(
            path.dirname(url.fileURLToPath(import.meta.url)),
            "../../../../.."
        ),
    },
    {
        key: "nestjs-backend-libs",
        rootNodeName: "NEST-BACKEND-LIBS",
        name: "NestJs Backend Libraries",
        color: "pink",

        rootLocation: path.join(
            path.dirname(url.fileURLToPath(import.meta.url)),
            "../../../../../../nest-backend-libs"
        ),
    },
];

@Injectable()
export class CoursesMetaService {
    getOne = (courseKey: string): CourseMetaDto => {
        const foundCourse = courseMeta.find(
            (course) => course.key === courseKey
        );
        if (!foundCourse) {
            throw new Error("Course not found");
        }
        return foundCourse;
    };

    getAll = (): CourseMetaDto[] => {
        return courseMeta;
    };
}
