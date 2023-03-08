import { Injectable } from "@nestjs/common";
import { CourseMetaDto } from "../dtos/CourseMetaDto.js";

const courseMeta: CourseMetaDto[] = [
    {
        key: "miller",
        rootNodeName: "USE-MILLER",
        name: "Use Miller",
        color: "green",

        rootLocation:
            "/Users/darraghoriordan/Documents/useral-projects/use-miller",
    },
    {
        key: "nestjs-backend-libs",
        rootNodeName: "NEST-BACKEND-LIBS",
        name: "NestJs Backend Libraries",
        color: "pink",

        rootLocation:
            "/Users/darraghoriordan/Documents/useral-projects/nest-backend-libs",
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
