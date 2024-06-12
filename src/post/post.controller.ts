import { createPostDto, updataPostDto } from './dto';
import { PostService } from './post.service';
import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('post')
export class PostController {
    constructor(
        private readonly postService:PostService
    ){}
    
    @Get(":id")
    getOne(@Param("id") id:number ){
        return this.postService.getOne(+id)
    }

    @Post()
    create(@Body() dto:createPostDto){
        return this.postService.save(dto)
    }

    @Patch(":id")
    updata(@Param("id") id:number, @Body() dto: updataPostDto){
        return this.postService.updata(+id, dto)
    }

    @Delete(":id")
    async delete(@Param("id") id:number){
        const post = await this.postService.getOne(+id)
        if(!post){
            throw new BadRequestException()
        }
        return this.postService.delete(+id)
    }
}
