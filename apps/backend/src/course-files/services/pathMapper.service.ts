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
        return path.join(
            rootPath,
            Buffer.from(base64, "base64").toString("ascii")
        );
    }
    mapPathToRelativeBase64(absolutePath: string, rootPath: string): string {
        const relativePath = absolutePath.replace(rootPath, "");

        return Buffer.from(relativePath).toString("base64");
    }
}

export default PathMapperService;
