import { CoreConfigurationService } from "@darraghor/nest-backend-libs";
import { Injectable } from "@nestjs/common";
import { CourseMetaDto } from "../dtos/CourseMetaDto.js";
import { ProductMeta } from "./ProductMeta";

@Injectable()
export class CoursesMetaService {
    constructor(private readonly coreConfig: CoreConfigurationService) {}

    // probably should move this out of here at some stage
    getProjectMetadata(): { [key: string]: ProductMeta } {
        return {
            ["miller-start"]: {
                color: "red",
                subscribedProductNames: ["myproduct"],
                projectMeta: [
                    {
                        key: "miller-web",
                        rootNodeName: "USE-MILLER",
                        name: "Miller Web",
                        color: "green",
                        demoPaths: ["**/apps/frontend/src/pages/**"],
                        demoFileLinkHref: `${
                            this.coreConfig.frontEndAppUrl
                        }/docs/miller-start/reference/miller-web/${btoa(
                            "/apps/frontend/src/pages/docs/[section]/[slug].tsx"
                        )}`,
                        demoFileLinkText: "/apps/frontend/src/pages",
                        rootLocation:
                            "/Users/darraghoriordan/Documents/personal-projects/use-miller",
                    },
                    {
                        key: "nestjs-backend-libs",
                        rootNodeName: "NEST-BACKEND-LIBS",
                        name: "NestJs Backend Libraries",
                        color: "pink",
                        demoPaths: ["**/src/twitter-client/**"],
                        demoFileLinkHref: `${
                            this.coreConfig.frontEndAppUrl
                        }/docs/miller-start/reference/nestjs-backend-libs/${btoa(
                            "/src/twitter-client/twitter-account.module.ts"
                        )}`,

                        demoFileLinkText: "/src/twitter-client",
                        rootLocation:
                            "/Users/darraghoriordan/Documents/personal-projects/nest-backend-libs",
                    },
                ],
            },
            ["dev-shell"]: {
                color: "green",
                subscribedProductNames: ["Dev Shell"],
                projectMeta: [
                    {
                        key: "dev-shell-scripts",
                        rootNodeName: "DEV-SHELL",
                        name: "Dev Shell Scripts",
                        color: "green",
                        demoPaths: ["**/home/setupscripts/mac/brew.sh"],
                        demoFileLinkHref: `${
                            this.coreConfig.frontEndAppUrl
                        }/docs/dev-shell/reference/dev-shell-scripts/${btoa(
                            "/home/setupscripts/mac/brew.sh"
                        )}`,
                        demoFileLinkText: "/home/setupscripts/mac/brew.sh",
                        rootLocation:
                            "/Users/darraghoriordan/Documents/personal-projects/mac-setup-script",
                    },
                ],
            },
            ["local-dev-tools"]: {
                color: "pink",
                subscribedProductNames: ["Local Dev Tools"],
                projectMeta: [],
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
    getOneProduct = (productKey: string): ProductMeta => {
        const foundProduct = this.getProjectMetadata()[productKey];
        if (!foundProduct) {
            throw new Error("Product not found");
        }
        return foundProduct;
    };
    getOneProject = (productKey: string, projectKey: string): CourseMetaDto => {
        const foundCourse = this.getProjectMetadata()[
            productKey
        ].projectMeta.find((course) => course.key === projectKey);
        if (!foundCourse) {
            throw new Error("Project not found for product");
        }
        return foundCourse;
    };
}
