import { ApiProperty } from "@nestjs/swagger";

export class InitUserRequestDto {
    @ApiProperty()
    ownerId!: string;
}
