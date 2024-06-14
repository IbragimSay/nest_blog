import { ApiProperty } from "@nestjs/swagger"

export class createImageResponse {
    @ApiProperty({default: 1})
    id: number
    @ApiProperty({default: "url image"})
    content: string
    @ApiProperty({default: 1})
    order: number
    
}