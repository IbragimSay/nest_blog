import { ApiProperty } from "@nestjs/swagger"

export class updataImageResponse {

    @ApiProperty({default: 1})
    id: number
    @ApiProperty({default: "2024-06-24T09:40:10.368Z.jpg"})
    conteent: string
    @ApiProperty({default: 2})
    order: number
    @ApiProperty({default: 1})
    postId: number
}