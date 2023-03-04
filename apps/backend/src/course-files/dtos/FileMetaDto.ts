import { ApiProperty } from "@nestjs/swagger";

export class FileMetaDto {
    @ApiProperty()
    public contents!: string;
    @ApiProperty()
    public fileLocation!: string;
}
