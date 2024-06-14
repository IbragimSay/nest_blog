import { ApiProperty } from "@nestjs/swagger"

export class createPostTextResponse {
    @ApiProperty({default: 1})
    id: number
    @ApiProperty({default: "text text text"})
    text: string
    @ApiProperty({default: 1})
    order: 1
}