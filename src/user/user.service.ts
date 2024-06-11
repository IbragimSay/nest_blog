import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { createUserDto, updataUserDto } from './dto';

@Injectable()
export class UserService {
    constructor(
        private readonly prismaService:PrismaService
    ){}

    async findByIdOrMail(idOrMail:string){
        return await this.prismaService.user.findFirst({
            where: {
                OR: [
                    {id:idOrMail},
                    {mail:idOrMail}
                ]
            }
        })
    }
    
    async findByUserName(userName:string){
        return await this.prismaService.user.findFirst({
            where: {
                userName
            }
        })
    }

    async save(dto:createUserDto){
        return await this.prismaService.user.create({
            data: {
                ...dto,
                roles: ["User"]
            }
        })
    }

    async updata(id:string, dto:updataUserDto){
        return await this.prismaService.user.update({
            where: {
                id
            },
            data: {
                ...dto
            }
        })
    }

    async delete(id:string){
        return await this.prismaService.user.delete({
            where: {
                id
            },
            select: {
                id:true
            }
        })
    }
}
