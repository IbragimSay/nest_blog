import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { createPostDto, updataPostDto } from './dto';
import { PostService } from './post.service';
import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { createPostResponse, deletePostResponse, PostResponse, updataPostResponse } from './response';

@Controller('post')
@ApiTags("post")
export class PostController {
    constructor(
        private readonly postService:PostService
    ){}
    
    @Get(":id")
    @ApiResponse({
        status: HttpStatus.OK,
        type: PostResponse
    })
    getOne(@Param("id") id:number ){
        return this.postService.getOne(+id)
    }

    @Get("page/:page")
    @ApiResponse({
        status: HttpStatus.OK,
        type: [PostResponse]
    })
    getAll(@Param("page") page: number){
        if(page <= 0){
            throw new BadRequestException()
        }
        return this.postService.getAll(+page)
    }

    @Post()
    @ApiResponse({
        status: HttpStatus.OK,
        type: createPostResponse
    })
    create(@Body() dto:createPostDto){
        return this.postService.save(dto)
    }

    @Patch(":id")
    @ApiResponse({
        status: HttpStatus.OK,
        type: updataPostResponse
    })
    updata(@Param("id") id:number, @Body() dto: updataPostDto){
        return this.postService.updata(+id, dto)
    }

    @Delete(":id")
    @ApiResponse({
        status: HttpStatus.OK,
        type: deletePostResponse
    })
    async delete(@Param("id") id:number){
        const post = await this.postService.getOne(+id)
        if(!post){
            throw new BadRequestException()
        }
        return this.postService.delete(+id)
    }
}
