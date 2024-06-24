import { PostService } from 'src/post/post.service';
import { PrismaService } from 'src/prisma/prisma.service';
<<<<<<< HEAD
import { BadRequestException, Injectable} from '@nestjs/common';
import { unlink } from "fs"
import { Images, Post } from '@prisma/client';
=======
import { BadRequestException, Injectable, UnauthorizedException,} from '@nestjs/common';
import { unlink } from "fs"
import { Images, Post, } from '@prisma/client';
import { updataImageDto } from './dto/updataImage.dto';
>>>>>>> post
@Injectable()
export class ImageService {
    constructor(
        private readonly prismaService:PrismaService,
        private readonly postService:PostService
    ){}

    async upload(file:string, id:number, order:number){
<<<<<<< HEAD
        const post:Post = await this.postService.getOne(id)  
=======
        const post:Post = await this.postService.getOne(id) 
>>>>>>> post
        if(!post){
            throw new BadRequestException()
        }
        return await this.prismaService.images.create({
            data: {
                content: file,
                order,
                postId: id,
            }
        })
    }

    async delete(id:number){
        const image:Images = await this.prismaService.images.findFirst({
            where: {
                id
            }
        })
        if(!image){
            throw new BadRequestException()
        }
        unlink("upload/" + image.content, (err)=>{
            if(err){
                throw new BadRequestException()
            }
        })
        return await this.prismaService.images.delete({
            where:{
                id
            },
            select: {
                id:true
            }
        })
    }
<<<<<<< HEAD
=======

    async updataImage(dto:updataImageDto, id:number, userId: string){
        const image:Images = await this.prismaService.images.findFirst({
            where: {
                id
            }
        })
        

        const post:Post = await this.prismaService.post.findFirst({
            where: {
                id: image.postId
            }
        })
        
        if(post.userId != userId){
            throw new UnauthorizedException()
        }

        return await this.prismaService.images.update({
            where: {
                id: id
            },
            data: {
                ...dto
            }
        })
    }
>>>>>>> post
}
