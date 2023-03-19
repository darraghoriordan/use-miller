/* eslint-disable sonarjs/no-duplicate-string */
import { RequestUser } from "@darraghor/nest-backend-libs/dist/authorization/models/RequestWithUser.js";
import { Injectable } from "@nestjs/common";
import { minimatch } from "minimatch";

@Injectable()
export class FileVisibilityControlGuard {
    shouldShowFullFile = (
        fileLocation: string,
        demoPaths: string[],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        productKey: string,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        user?: RequestUser
    ): boolean => {
        // TODO: match products to user's org's subscriptions!
        const globs = demoPaths;
        // eslint-disable-next-line sonarjs/prefer-immediate-return
        const isMatch = globs.some((g) => minimatch(fileLocation, g));
        return isMatch;
    };
}
