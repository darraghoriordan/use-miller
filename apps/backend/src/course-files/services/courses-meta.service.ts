import { CoreConfigurationService } from "@darraghor/nest-backend-libs";
import { Injectable } from "@nestjs/common";
import { CourseMetaDto } from "../dtos/CourseMetaDto.js";

@Injectable()
export class CoursesMetaService {
    constructor(private readonly coreConfig: CoreConfigurationService) {}

    // probably should move this out of here at some stage
    getProjectMetadata(): {
        [key: string]: {
            color: string;
            projectMeta: CourseMetaDto[];
        };
    } {
        return {
            ["miller-start"]: {
                color: "green",
                projectMeta: [
                    {
                        key: "miller-web",
                        rootNodeName: "USE-MILLER",
                        name: "Miller Web",
                        color: "green",
                        demoPaths: ["**/apps/frontend/src/pages/**"],
                        demoFileLinkHref: `miller-start/${
                            this.coreConfig.frontEndAppUrl
                        }/docs/reference/miller-web/${btoa(
                            "/apps/frontend/src/pages/docs/[section]/[slug].tsx"
                        )}`,
                        demoFileLinkText: "Page Router",
                        rootLocation:
                            "/Users/darraghoriordan/Documents/personal-projects/use-miller",
                    },

                    {
                        key: "nestjs-backend-libs",
                        rootNodeName: "NEST-BACKEND-LIBS",
                        name: "NestJs Backend Libraries",
                        color: "pink",
                        demoPaths: ["**/src/twitter-client/**"],
                        demoFileLinkHref: `miller-start/${
                            this.coreConfig.frontEndAppUrl
                        }/docs/reference/nestjs-backend-libs/${btoa(
                            "/src/stripe-client/services/stripe-webhook-handler.service.ts"
                        )}`,

                        demoFileLinkText: "Stripe Services",
                        rootLocation:
                            "/Users/darraghoriordan/Documents/personal-projects/nest-backend-libs",
                    },
                ],
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
        };
    }
    getOne = (productKey: string, projectKey: string): CourseMetaDto => {
        const foundCourse = this.getProjectMetadata()[
            productKey
        ].projectMeta.find((course) => course.key === projectKey);
        if (!foundCourse) {
            throw new Error("Project not found for product");
        }
        return foundCourse;
    };

    getAll = (productKey: string): CourseMetaDto[] => {
        const meta = this.getProjectMetadata();
        console.log("meta", meta);
        return meta[productKey].projectMeta || [];
    };
}
