import { ApiProperty } from "@nestjs/swagger"

export class updataPostTextDto {
    @ApiProperty({default: "text2 text2 text2"})
    text: string
    @ApiProperty({default: 1})
    order: number
}