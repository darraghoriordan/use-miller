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
        subscribedProductNames: string[],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        user?: RequestUser
    ): boolean => {
        // if the person is in an org that has paid for the product, then they can see all files
        if (
            subscribedProductNames.some((p) =>
                user?.activeSubscriptionProducts.includes(p)
            )
        ) {
            return true;
        }

        //otherwise some files are always visible e.g. "demo" areas
        const globs = demoPaths;
        // eslint-disable-next-line sonarjs/prefer-immediate-return
        const isMatch = globs.some((g) => minimatch(fileLocation, g));
        return isMatch;
    };
}
