import { ApiProperty } from "@nestjs/swagger"

export class Tokens{
    @ApiProperty({default: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJmM2Y1OGQwLWQxMjQtNDg0NC1hOTYzLWM0ZTAyNDIxYTNkOCIsIm1haWwiOiJhcmdlbkBtYWlsLnJ1Iiwicm9sZXMiOltdLCJpYXQiOjE3MTgwNDQzNTIsImV4cCI6MTcxODU2Mjc1Mn0.QtYBuhbEHGVhZ9ohrSM6jX_RU39rz5CPYlCKuvOdvmU"})
    accsesToken: string
    @ApiProperty({default: "761b2e2f-bd6d-475f-85e3-5ad8dc21b9c8"})
    refreshToken:string
}

export class JwtPayload {
    id: string
    mail: string
    roles: string[]
}