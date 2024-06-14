import { ApiProperty } from "@nestjs/swagger";
import { MinLength } from "class-validator";

export class createPostDto{
    @ApiProperty({default: "title name"})
    title: string
}