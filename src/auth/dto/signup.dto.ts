import { IsEmail, MinLength } from "class-validator"

export class signupDto {
    @IsEmail()
    mail: string
    @MinLength(3)
    password: string
    @MinLength(3)
    userName: string
}