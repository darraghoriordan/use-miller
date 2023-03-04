import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class FileStructureDto {
    @ApiProperty()
    public name!: string;
    @ApiProperty({ enum: ["folder", "file"] })
    public type!: "folder" | "file";
    @ApiPropertyOptional()
    public isOpen?: boolean;
    @ApiProperty()
    public fileLocation!: string;
    @ApiPropertyOptional({ type: FileStructureDto, isArray: true })
    public children?: FileStructureDto[];
}
