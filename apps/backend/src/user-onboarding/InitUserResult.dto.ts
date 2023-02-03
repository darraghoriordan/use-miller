import { ApiProperty } from "@nestjs/swagger";

export class InitUserDto {
    @ApiProperty()
    userWasInitialised!: boolean;
}
