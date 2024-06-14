import { ApiProperty } from "@nestjs/swagger";

export class updataPostResponse {
    @ApiProperty({default: 1})
    id: number
    @ApiProperty({default: "new title name"})
    title: string
}