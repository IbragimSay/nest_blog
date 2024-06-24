import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { createPostDto, updataPostDto } from './dto';
import { PostService } from './post.service';
<<<<<<< HEAD
import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { createPostResponse, deletePostResponse, PostResponse, updataPostResponse } from './response';
=======
import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { createPostResponse, deletePostResponse, PostResponse, updataPostResponse } from './response';
import { JwtAuthGuard } from 'src/auth/guard';
import { Request } from 'express';
import { JwtPayload } from 'src/auth/interface';
>>>>>>> post

@Controller('post')
@ApiTags("post")
export class PostController {
    constructor(
<<<<<<< HEAD
        private readonly postService:PostService
=======
        private readonly postService:PostService,

>>>>>>> post
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

<<<<<<< HEAD
=======
    @UseGuards(JwtAuthGuard)
>>>>>>> post
    @Post()
    @ApiResponse({
        status: HttpStatus.OK,
        type: createPostResponse
    })
    create(@Body() dto:createPostDto){
        return this.postService.save(dto)
    }

<<<<<<< HEAD
=======
    @UseGuards(JwtAuthGuard)
>>>>>>> post
    @Patch(":id")
    @ApiResponse({
        status: HttpStatus.OK,
        type: updataPostResponse
    })
<<<<<<< HEAD
    updata(@Param("id") id:number, @Body() dto: updataPostDto){
        return this.postService.updata(+id, dto)
    }

=======
    updata(@Param("id") id:number, @Body() dto: updataPostDto, @Req() req:Request){
        const user:JwtPayload = req.user as JwtPayload
        return this.postService.updata(+id, dto, user.id)
    }

    @UseGuards(JwtAuthGuard)
>>>>>>> post
    @Delete(":id")
    @ApiResponse({
        status: HttpStatus.OK,
        type: deletePostResponse
    })
<<<<<<< HEAD
    async delete(@Param("id") id:number){
=======
    async delete(@Param("id") id:number, @Req() req:Request){
        const user:JwtPayload = req.user as JwtPayload
>>>>>>> post
        const post = await this.postService.getOne(+id)
        if(!post){
            throw new BadRequestException()
        }
<<<<<<< HEAD
        return this.postService.delete(+id)
=======
        
        return this.postService.delete(+id, user.id)
>>>>>>> post
    }
}
