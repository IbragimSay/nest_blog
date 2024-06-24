import { updataPostDto } from './../post/dto/updata-post.dto';
import { PostService } from './../post/post.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { createPostTextDto } from './dto';
import { updataPostTextDto } from './dto/updatePostText.dto';
import { Post, PostText } from '@prisma/client';

@Injectable()
export class PostTextService {
    constructor(
        private readonly prismaService:PrismaService,
        private readonly postService:PostService
    ){}
    
    
    async save(id:number, dto:createPostTextDto, userId:string){
        const post:Post = await this.postService.getOne(id)
        if(!post){
            throw new BadRequestException()
        }
        if(post.userId != userId){
            throw new BadRequestException()
        }
        
        return await this.prismaService.postText.create({
            data: {
                ...dto,
                postId: id
            }
        })
    }

    async updata(id:number, dto:updataPostTextDto, userId:string){
        const text = await this.prismaService.postText.findFirst({
            where: {
                id
            }
        })
        if(!text){
            throw new BadRequestException()
        }

        const post:Post = await this.postService.getOne(text.postId)

        if(post.userId != userId){
            throw new UnauthorizedException()
        }
        
        return await this.prismaService.postText.update({
            where: {
                id
            },
            data: {
                ...dto
            }
        })
    }

    async delete(id:number, userId: string){
        const text:PostText = await this.prismaService.postText.findFirst({
            where: {
                id
            }
        })
        if(!text){
            throw new BadRequestException()
        }

        const post:Post = await this.postService.getOne(text.postId)

        if(post.userId != userId){
            throw new UnauthorizedException()
        }

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
