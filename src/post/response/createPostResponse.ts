import { ApiProperty, ApiResponse } from "@nestjs/swagger";

export class createPostResponse {
    @ApiProperty({default: 1})
    id: number
    @ApiProperty({default: "title name"})
    title: string
}