import { ApiProperty } from "@nestjs/swagger"

export class createPostTextDto{
    @ApiProperty({default: "text text text"})
    text: string
    @ApiProperty({default: 1})
    order: number
}