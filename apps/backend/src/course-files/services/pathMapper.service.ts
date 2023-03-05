import { Injectable, Logger } from "@nestjs/common";
import path from "path";

/**
 * Maps server file paths to base64 to be used in urls and vice versa
 */
@Injectable()
class PathMapperService {
    private readonly logger = new Logger(PathMapperService.name);
    public mapBase64ToAbsolutePath(base64: string, rootPath: string): string {
        this.logger.log(
            {
                base64,
                rootPath,
            },
            "mapping base64 to absolute path"
        );

        const result = path.join(
            rootPath,
            Buffer.from(base64, "base64").toString("ascii")
        );

        this.logger.log(
            {
                result,
            },
            "mapped base64 to absolute path"
        );
        return result;
    }
    mapPathToRelativeBase64(absolutePath: string, rootPath: string): string {
        this.logger.log(
            {
                absolutePath,
                rootPath,
            },
            "mapping absolute path to relative base64"
        );
        const relativePath = absolutePath.replace(rootPath, "");
        this.logger.log(
            {
                relativePath,
            },
            "mapped absolute path to relative base64"
        );
        return Buffer.from(relativePath).toString("base64");
    }
}

export default PathMapperService;
