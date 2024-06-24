import { PrismaService } from './../prisma/prisma.service';
<<<<<<< HEAD
import { Injectable } from '@nestjs/common';
import { createPostDto, updataPostDto } from './dto';
=======
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { createPostDto, updataPostDto } from './dto';
import { Post } from '@prisma/client';
>>>>>>> post

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
<<<<<<< HEAD
=======
                userId: true,
>>>>>>> post
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
<<<<<<< HEAD
=======
                userId: true,
>>>>>>> post
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

<<<<<<< HEAD
    async updata(id:number, dto:updataPostDto){
=======
    async updata(id:number, dto:updataPostDto, userId:string){
        const post:Post = await this.getOne(id)

        if(post.userId != userId){
            throw new UnauthorizedException()
        }
        
>>>>>>> post
        return await this.prismaService.post.update({
            where: {
                id
            },
            data: {
                ...dto
            }
        })
    }

<<<<<<< HEAD
    async delete(id:number){
=======
    async delete(id:number, userId){
        const post:Post = await this.getOne(id)
    
        if(post.userId != userId){
            throw new UnauthorizedException()
        }
>>>>>>> post
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
