import { Injectable } from "@nestjs/common";
import { CourseMetaDto } from "../dtos/CourseMetaDto.js";

const courseMeta: CourseMetaDto[] = [
    {
        key: "miller",
        rootNodeName: "USE-MILLER",
        name: "Miller Web",
        color: "green",

        rootLocation:
            "/Users/darraghoriordan/Documents/personal-projects/use-miller",
    },

    {
        key: "nestjs-backend-libs",
        rootNodeName: "NEST-BACKEND-LIBS",
        name: "NestJs Backend Libraries",
        color: "pink",

        rootLocation:
            "/Users/darraghoriordan/Documents/personal-projects/nest-backend-libs",
    },
    // leave this one for now
    // {
    //     key: "miller-desktop",
    //     rootNodeName: "MILLER-ELECTRON",
    //     name: "Miller Desktop App",
    //     color: "pink",

    //     rootLocation:
    //         "/Users/darraghoriordan/Documents/personal-projects/ssh-tool-new-electron",
    // },
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
