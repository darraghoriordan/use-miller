import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class FileMetaDto {
    @ApiProperty()
    public contents!: string;
    @ApiProperty()
    public fileLocation!: string;
    @ApiProperty()
    public fileName!: string;
    @ApiPropertyOptional()
    public nearestReadmeLocation?: string;
}
