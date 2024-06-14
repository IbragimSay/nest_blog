import { ApiProperty } from "@nestjs/swagger";

export class deletePostTextResponse {
    @ApiProperty({default: 1})
    id: number
}