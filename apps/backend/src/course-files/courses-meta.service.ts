import { Injectable } from "@nestjs/common";
import path from "path";
import { CourseMetaDto } from "./CourseMetaDto";

const courseMeta: CourseMetaDto[] = [
    {
        key: "miller",
        rootNodeName: "USE-MILLER",
        // eslint-disable-next-line unicorn/prefer-module
        rootLocation: path.join(__dirname, "../../../../.."),
    },
];

@Injectable()
export class CoursesMetaService {
    getMeta = (courseKey: string): CourseMetaDto => {
        const foundCourse = courseMeta.find(
            (course) => course.key === courseKey
        );
        if (!foundCourse) {
            throw new Error("Course not found");
        }
        return foundCourse;
    };
}
