/* eslint-disable sonarjs/no-duplicate-string */
import { Injectable, Logger } from "@nestjs/common";
import { minimatch } from "minimatch";

@Injectable()
export class FileVisibilityControlGuard {
    private readonly logger = new Logger(FileVisibilityControlGuard.name);
    shouldShowFullFile = ({
        fileLocation,
        demoPaths,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        productKey,
        lengthInLines,
        maximumLines,
        isOpenSourceProject,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        activeSubscriptionProductKeys,
    }: {
        fileLocation: string;
        demoPaths: string[];
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        productKey: string;
        lengthInLines: number;
        maximumLines: number;
        isOpenSourceProject: boolean;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        activeSubscriptionProductKeys?: string[];
    }): boolean => {
        this.logger.debug(
            {
                fileLocation,
                userSubs: activeSubscriptionProductKeys,
                productKey,
            },
            `Checking if user can see file ${fileLocation}`,
        );
        // if the project is open source then it is always visible
        if (isOpenSourceProject) {
            return true;
        }
        // if the file is short, then it is always visible
        if (lengthInLines < maximumLines) {
            return true;
        }
        // added a new product variation for miller start (this shouldn't be here, but it's a quick fix)
        const productVariations =
            productKey === "miller-start"
                ? ["miller-start", "miller-start-consulting"]
                : [productKey];
        // if the person is in an org that has paid for the product, then they can see all files
        if (
            activeSubscriptionProductKeys?.some((k) =>
                productVariations.includes(k),
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
