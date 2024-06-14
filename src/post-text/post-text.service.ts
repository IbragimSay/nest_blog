import { updataPostDto } from './../post/dto/updata-post.dto';
import { PostService } from './../post/post.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { createPostTextDto } from './dto';
import { updataPostTextDto } from './dto/updatePostText.dto';

@Injectable()
export class PostTextService {
    constructor(
        private readonly prismaService:PrismaService,
        private readonly postService:PostService
    ){}
    
    async save(id:number, dto:createPostTextDto){
        const post = await this.postService.getOne(id)
        if(!post){
            throw new BadRequestException()
        }
        return await this.prismaService.postText.create({
            data: {
                ...dto,
                postId: id
            }
        })
    }

    async updata(id:number, dto:updataPostTextDto){
        const text = await this.prismaService.postText.findFirst({
            where: {
                id
            }
        })
        if(!text){
            throw new BadRequestException()
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

    async delete(id:number){
        const text = await this.prismaService.postText.findFirst({
            where: {
                id
            }
        })
        if(!text){
            throw new BadRequestException()
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
