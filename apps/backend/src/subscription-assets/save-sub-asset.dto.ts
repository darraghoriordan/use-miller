import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsIn, IsOptional, IsString, IsUrl } from "class-validator";

export class SaveSubscriptionAssetDto {
    @ApiPropertyOptional()
    @IsOptional()
    id?: number;

    @ApiProperty()
    @IsString()
    @IsIn([
        "miller-start",
        "dev-shell",
        "local-dev-tools",
        "miller-start-consulting",
    ])
    internalSku!: string;

    @ApiProperty()
    @IsUrl()
    uri!: string;

    @ApiProperty()
    @IsString()
    description!: string;

    @ApiProperty()
    @IsString()
    displayName!: string;
}
