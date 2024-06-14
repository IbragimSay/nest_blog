import { ApiProperty } from "@nestjs/swagger";

export class deleteImageResponse {
    @ApiProperty({default: 1})
    id: number
}