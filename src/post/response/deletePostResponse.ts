import { ApiProperty } from "@nestjs/swagger"

export class deletePostResponse {
    @ApiProperty({default: 1})
    id: number
}