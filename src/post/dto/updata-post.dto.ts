import { ApiProperty } from "@nestjs/swagger";

export class updataPostDto {
    @ApiProperty({default: "new title name"})
    title: string
}