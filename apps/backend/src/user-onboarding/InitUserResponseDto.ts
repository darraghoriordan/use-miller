import { ApiProperty } from "@nestjs/swagger";

export class InitUserResponseDto {
    @ApiProperty()
    userWasInitialised!: boolean;
}
