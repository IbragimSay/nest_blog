import { updataPostDto } from './../post/dto/updata-post.dto';
import { PostService } from './../post/post.service';
import { PrismaService } from 'src/prisma/prisma.service';
<<<<<<< HEAD
import { BadRequestException, Injectable } from '@nestjs/common';
import { createPostTextDto } from './dto';
import { updataPostTextDto } from './dto/updatePostText.dto';
=======
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { createPostTextDto } from './dto';
import { updataPostTextDto } from './dto/updatePostText.dto';
import { Post, PostText } from '@prisma/client';
>>>>>>> post

@Injectable()
export class PostTextService {
    constructor(
        private readonly prismaService:PrismaService,
        private readonly postService:PostService
    ){}
    
<<<<<<< HEAD
    async save(id:number, dto:createPostTextDto){
        const post = await this.postService.getOne(id)
        if(!post){
            throw new BadRequestException()
        }
=======
    
    async save(id:number, dto:createPostTextDto, userId:string){
        const post:Post = await this.postService.getOne(id)
        if(!post){
            throw new BadRequestException()
        }
        if(post.userId != userId){
            throw new BadRequestException()
        }
        
>>>>>>> post
        return await this.prismaService.postText.create({
            data: {
                ...dto,
                postId: id
            }
        })
    }

<<<<<<< HEAD
    async updata(id:number, dto:updataPostTextDto){
=======
    async updata(id:number, dto:updataPostTextDto, userId:string){
>>>>>>> post
        const text = await this.prismaService.postText.findFirst({
            where: {
                id
            }
        })
        if(!text){
            throw new BadRequestException()
        }
<<<<<<< HEAD
=======

        const post:Post = await this.postService.getOne(text.postId)

        if(post.userId != userId){
            throw new UnauthorizedException()
        }
        
>>>>>>> post
        return await this.prismaService.postText.update({
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
        const text = await this.prismaService.postText.findFirst({
=======
    async delete(id:number, userId: string){
        const text:PostText = await this.prismaService.postText.findFirst({
>>>>>>> post
            where: {
                id
            }
        })
        if(!text){
            throw new BadRequestException()
        }
<<<<<<< HEAD
=======

        const post:Post = await this.postService.getOne(text.postId)

        if(post.userId != userId){
            throw new UnauthorizedException()
        }

>>>>>>> post
        return await this.prismaService.postText.delete({
            where: {
                id
            },
            select: {
                id:true
            }
        })
    }
}
