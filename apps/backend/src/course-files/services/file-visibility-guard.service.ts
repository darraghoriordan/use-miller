/* eslint-disable sonarjs/no-duplicate-string */
import { RequestUser } from "@darraghor/nest-backend-libs";
import { Injectable, Logger } from "@nestjs/common";
import { minimatch } from "minimatch";

@Injectable()
export class FileVisibilityControlGuard {
    private readonly logger = new Logger(FileVisibilityControlGuard.name);
    shouldShowFullFile = (
        fileLocation: string,
        demoPaths: string[],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        productKey: string,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        user?: RequestUser
    ): boolean => {
        this.logger.debug(
            {
                fileLocation,
                userSubs: user?.activeSubscriptionProductKeys,
                productKey,
            },
            `Checking if user can see file ${fileLocation}`
        );
        // if the person is in an org that has paid for the product, then they can see all files
        if (user?.activeSubscriptionProductKeys.includes(productKey)) {
            return true;
        }

        //otherwise some files are always visible e.g. "demo" areas
        const globs = demoPaths;
        // eslint-disable-next-line sonarjs/prefer-immediate-return
        const isMatch = globs.some((g) => minimatch(fileLocation, g));
        return isMatch;
    };
}
