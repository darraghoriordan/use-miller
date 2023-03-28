import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID } from "class-validator";

export class OrgGithubUserDto {
    @ApiProperty()
    @IsString()
    ghUsername!: string;

    @ApiProperty()
    @IsUUID("4")
    orgUuid!: string;
}
