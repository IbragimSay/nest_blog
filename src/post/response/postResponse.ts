import { ApiProperty } from "@nestjs/swagger"

class PostTextResponse {
    @ApiProperty({default: 1})
    id: number
    @ApiProperty({default: "text text text"})
    text: string
    @ApiProperty({default: 1})
    order: 1
}
class PostImageResponse {
    @ApiProperty({default: 1})
    id: number
    @ApiProperty({default: "url image"})
    content: string
    @ApiProperty({default: 1})
    order: number
    
}
export class PostResponse {
    @ApiProperty({default: 1})
    id: number
    @ApiProperty({default: "title name"})
    title: string
    @ApiProperty({type: [PostTextResponse]})
    texts: PostTextResponse[]
    @ApiProperty({type: [PostImageResponse]})
    images: PostImageResponse
}