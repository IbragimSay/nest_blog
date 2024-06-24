import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { createPostTextDto, updataPostTextDto } from './dto';
import { PostTextService } from './post-text.service';
import { Body, Controller, Delete, HttpStatus, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { createPostTextResponse, deletePostTextResponse, updataPostTextResponse } from './response';
import { JwtAuthGuard } from 'src/auth/guard';
import { Request } from 'express';
import { JwtPayload } from 'src/auth/interface';

@Controller('post-text')
@ApiTags("post-text")
export class PostTextController {
    constructor(
        private readonly postTextService:PostTextService
    ){}
    
    @UseGuards(JwtAuthGuard)
    @Post(":id")
        @ApiResponse({
            status: HttpStatus.OK,
            type: createPostTextResponse
        })
    save(@Body() dto:createPostTextDto, @Param("id") id:number, @Req() req:Request){
        const user:JwtPayload = req.user as JwtPayload
        return this.postTextService.save(+id, dto, user.id)
    }

    @Patch(":id")
    @ApiResponse({
        status: HttpStatus.OK,
        type: updataPostTextResponse
    })
    updata(@Body() dto:updataPostTextDto, @Param("id") id:number, @Req() req:Request ){
        const user:JwtPayload = req.user as JwtPayload 
        return this.postTextService.updata(+id, dto, user.id)
    }

    @Delete(":id")
    @ApiResponse({
        status: HttpStatus.OK,
        type: deletePostTextResponse
    })
    delete(@Param("id") id:number, @Req() req:Request){
        const user: JwtPayload = req.user as JwtPayload
        return this.postTextService.delete(+id, user.id)
    }
}
