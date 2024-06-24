import { ApiProperty } from "@nestjs/swagger";

export class updataImageDto {
    @ApiProperty({default: 2})
    order: number
}