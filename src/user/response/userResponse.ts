import { ApiProperty } from '@nestjs/swagger';
import { User } from "@prisma/client"
import { Exclude } from "class-transformer"

export class UserResponse {
    @ApiProperty({default: "761b2e2f-bd6d-475f-85e3-5ad8dc21b9c8"})
    id: string
    @ApiProperty({default: "test@mail.ru"})
    mail: string
    @Exclude()
    password: string

    @ApiProperty({default: "test"})
    usereName: string
    @ApiProperty({default: ["user"]})
    roles: string[]
    constructor(user:User){
        Object.assign(this, user)
    }
}