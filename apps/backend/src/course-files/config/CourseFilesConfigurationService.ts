/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ValidatedConfigurationService } from "@darraghor/nest-backend-libs";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { IsDefined, IsString } from "class-validator";

@Injectable()
export class CourseFilesConfigurationService extends ValidatedConfigurationService {
    constructor(private configService: ConfigService) {
        super();
    }

    @IsDefined()
    @IsString()
    get basePath(): string {
        return this.configService.get<string>("course-files.basePath")!;
    }
}
