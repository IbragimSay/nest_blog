import { User } from "@prisma/client"
import { Exclude } from "class-transformer"

export class UserResponse {
    id: string
    mail: string
    @Exclude()
    password: string
    usereName: string
    roles: string[]
    constructor(user:User){
        Object.assign(this, user)
    }
}