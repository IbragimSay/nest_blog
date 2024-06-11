export class Tokens{
    accsesToken: string
    refreshToken:string
    
}

export class JwtPayload {
    id: string
    mail: string
    roles: string[]
}