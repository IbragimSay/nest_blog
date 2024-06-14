import { ApiProperty } from "@nestjs/swagger"

export class updataPostTextResponse {
    @ApiProperty({default: 1})
    id: number
    @ApiProperty({default: "text2 text2 text2"})
    text: string
    @ApiProperty({default: 1})
    order: 1
}