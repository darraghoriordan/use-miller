import { ApiProperty } from "@nestjs/swagger";
import {
    IsString,
    IsUUID,
    Matches,
    MaxLength,
    MinLength,
} from "class-validator";

// GitHub username rules:
// - 1-39 characters
// - Can contain alphanumeric characters and hyphens
// - Cannot start or end with a hyphen
// - Cannot have consecutive hyphens
const GITHUB_USERNAME_REGEX =
    /^[a-zA-Z\d](?:[a-zA-Z\d]|-(?=[a-zA-Z\d])){0,38}$/;

export class OrgGithubUserDto {
    @ApiProperty({
        description: "GitHub username (1-39 chars, alphanumeric and hyphens)",
        example: "octocat",
    })
    @IsString()
    @MinLength(1)
    @MaxLength(39)
    @Matches(GITHUB_USERNAME_REGEX, {
        message:
            "GitHub username must start with a letter or number and can only contain letters, numbers, and single hyphens",
    })
    ghUsername!: string;

    @ApiProperty()
    @IsUUID("4")
    orgUuid!: string;
}
