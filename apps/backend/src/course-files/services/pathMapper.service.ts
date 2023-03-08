import {
    Injectable,
    // Logger
} from "@nestjs/common";
import path from "path";

/**
 * Maps server file paths to base64 to be used in urls and vice versa
 */
@Injectable()
class PathMapperService {
    //private readonly logger = new Logger(PathMapperService.name);
    public mapBase64ToAbsolutePath(base64: string, rootPath: string): string {
        const decoded = Buffer.from(base64, "base64").toString("ascii");

        const joinedPath = path.join(rootPath, decoded);
        if (joinedPath.indexOf(rootPath) !== 0) {
            // trying to break out of rootpath
            throw new Error("Invalid path detected");
        }

        return joinedPath;
    }
    mapPathToRelativeBase64(absolutePath: string, rootPath: string): string {
        const relativePath = absolutePath.replace(rootPath, "");

        return Buffer.from(relativePath).toString("base64");
    }
}

export default PathMapperService;
