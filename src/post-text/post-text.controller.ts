import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { createPostTextDto, updataPostTextDto } from './dto';
import { PostTextService } from './post-text.service';
<<<<<<< HEAD
import { Body, Controller, Delete, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { createPostTextResponse, deletePostTextResponse, updataPostTextResponse } from './response';
=======
import { Body, Controller, Delete, HttpStatus, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { createPostTextResponse, deletePostTextResponse, updataPostTextResponse } from './response';
import { JwtAuthGuard } from 'src/auth/guard';
import { Request } from 'express';
import { JwtPayload } from 'src/auth/interface';
>>>>>>> post

@Controller('post-text')
@ApiTags("post-text")
export class PostTextController {
    constructor(
        private readonly postTextService:PostTextService
    ){}
    
<<<<<<< HEAD
=======
    @UseGuards(JwtAuthGuard)
>>>>>>> post
    @Post(":id")
        @ApiResponse({
            status: HttpStatus.OK,
            type: createPostTextResponse
        })
<<<<<<< HEAD
    save(@Body() dto:createPostTextDto, @Param("id") id:number){
        return this.postTextService.save(+id, dto)
=======
    save(@Body() dto:createPostTextDto, @Param("id") id:number, @Req() req:Request){
        const user:JwtPayload = req.user as JwtPayload
        return this.postTextService.save(+id, dto, user.id)
>>>>>>> post
    }

    @Patch(":id")
    @ApiResponse({
        status: HttpStatus.OK,
        type: updataPostTextResponse
    })
<<<<<<< HEAD
    updata(@Body() dto:updataPostTextDto, @Param("id") id:number ){
        return this.postTextService.updata(+id, dto)
=======
    updata(@Body() dto:updataPostTextDto, @Param("id") id:number, @Req() req:Request ){
        const user:JwtPayload = req.user as JwtPayload 
        return this.postTextService.updata(+id, dto, user.id)
>>>>>>> post
    }

    @Delete(":id")
    @ApiResponse({
        status: HttpStatus.OK,
        type: deletePostTextResponse
    })
<<<<<<< HEAD
    delete(@Param("id") id:number){
        return this.postTextService.delete(+id)
=======
    delete(@Param("id") id:number, @Req() req:Request){
        const user: JwtPayload = req.user as JwtPayload
        return this.postTextService.delete(+id, user.id)
>>>>>>> post
    }
}
