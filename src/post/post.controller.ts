import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { createPostDto, updataPostDto } from './dto';
import { PostService } from './post.service';
import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { createPostResponse, deletePostResponse, PostResponse, updataPostResponse } from './response';
import { JwtAuthGuard } from 'src/auth/guard';
import { Request } from 'express';
import { JwtPayload } from 'src/auth/interface';

@Controller('post')
@ApiTags("post")
export class PostController {
    constructor(
        private readonly postService:PostService,

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

    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiResponse({
        status: HttpStatus.OK,
        type: createPostResponse
    })
    create(@Body() dto:createPostDto){
        return this.postService.save(dto)
    }

    @UseGuards(JwtAuthGuard)
    @Patch(":id")
    @ApiResponse({
        status: HttpStatus.OK,
        type: updataPostResponse
    })
    updata(@Param("id") id:number, @Body() dto: updataPostDto, @Req() req:Request){
        const user:JwtPayload = req.user as JwtPayload
        return this.postService.updata(+id, dto, user.id)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    @ApiResponse({
        status: HttpStatus.OK,
        type: deletePostResponse
    })
    async delete(@Param("id") id:number, @Req() req:Request){
        const user:JwtPayload = req.user as JwtPayload
        const post = await this.postService.getOne(+id)
        if(!post){
            throw new BadRequestException()
        }
        
        return this.postService.delete(+id, user.id)
    }
}
