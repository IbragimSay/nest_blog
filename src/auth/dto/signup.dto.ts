import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, MinLength } from "class-validator"

export class signupDto {
    @ApiProperty({default: "test@mail.ru"})
    @IsEmail()
    mail: string
    @ApiProperty({default: "test"})
    @MinLength(3)
    password: string
    @ApiProperty({default: "test"})
    @MinLength(3)
    userName: string
}