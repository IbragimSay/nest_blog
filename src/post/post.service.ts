import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { createPostDto, updataPostDto } from './dto';

@Injectable()
export class PostService {
    constructor(
        private readonly prismaService:PrismaService
    ){}

    async getOne(id:number){
        return await this.prismaService.post.findFirst({
            where: {
                id
            },
            select: {
                id: true,
                title: true,
                userId: true,
                texts: {
                    select:{
                        id:true,
                        text:true,
                        order: true
                    }
                },
                images: {
                    select: {
                        id: true,
                        content: true,
                        order:true
                    }
                }
            }
        })
    }

    async getAll(page:number){
        const sizePage = 12
        return await this.prismaService.post.findMany({
            take: sizePage,
            skip: (page - 1) * sizePage,
            select: {
                id: true,
                title: true,
                texts: {
                    select:{
                        id:true,
                        text:true,
                        order: true
                    }
                },
                images: {
                    select: {
                        id: true,
                        content: true,
                        order:true
                    }
                }
            }
        })
    }

    async save(dto:createPostDto){
        return await this.prismaService.post.create({
            data: {
                ...dto
            }
        })
    }

    async updata(id:number, dto:updataPostDto){
        return await this.prismaService.post.update({
            where: {
                id
            },
            data: {
                ...dto
            }
        })
    }

    async delete(id:number){
        return await this.prismaService.post.delete({
            where: {
                id
            },
            select: {
                id:true
            }
        })
    }

}
