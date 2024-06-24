import { PostService } from 'src/post/post.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { BadRequestException, Injectable} from '@nestjs/common';
import { unlink } from "fs"
import { Images, Post } from '@prisma/client';
import { updataImageDto } from './dto/updataImage.dto';
@Injectable()
export class ImageService {
    constructor(
        private readonly prismaService:PrismaService,
        private readonly postService:PostService
    ){}

    async upload(file:string, id:number, order:number){
        const post:Post = await this.postService.getOne(id)  
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

    async updataImage(dto:updataImageDto, id:number, userId: string){
        const image = await this.prismaService.images.findFirst({
            where: {
                id
            }
        })
        const post:Post = await this.prismaService.post.findFirst({
            where: {
                id: image.postId
            }
        })
        
    }
}
