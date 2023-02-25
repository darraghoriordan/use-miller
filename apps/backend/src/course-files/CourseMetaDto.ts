import { ApiProperty } from "@nestjs/swagger";

export class CourseMetaDto {
    @ApiProperty()
    public key!: string;
    @ApiProperty()
    public rootNodeName!: string;
    @ApiProperty()
    public rootLocation!: string;
}