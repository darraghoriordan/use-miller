import { ApiProperty } from "@nestjs/swagger";

export class CourseMetaDto {
    @ApiProperty()
    public key!: string;
    @ApiProperty()
    public rootNodeName!: string;
    @ApiProperty({ type: String, isArray: true })
    public demoPaths!: string[];
    @ApiProperty()
    public rootLocation!: string;
    @ApiProperty()
    demoFileLinkHref!: string;
    @ApiProperty()
    demoFileLinkText!: string;
    @ApiProperty()
    public name!: string;
    @ApiProperty()
    public color!: string;
}
