import { JwtAuthGuard } from './../auth/guard/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import { BadRequestException, Body, Controller, Delete, HttpStatus, Param, Patch, Post, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { diskStorage } from 'multer';
import { Request } from 'express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { createImageResponse, deleteImageResponse } from './response';
import { updataImageDto } from './dto/updataImage.dto';
import { JwtPayload } from 'src/auth/interface';

@Controller('image')
@ApiTags("image")
export class ImageController {
    constructor(
        private readonly imageService:ImageService
    ){}

    @UseInterceptors(
        FileInterceptor("image", {
            storage: diskStorage({
                destination: "upload",
                filename: (_, __, cb)=>{
                    cb(null, new Date().toISOString() + ".jpg")
                }
            })
        })
    )

    @Post()
    @ApiResponse({
        status: HttpStatus.OK,
        type: createImageResponse
    })
    async upload(@Req() req:Request, @Query("post-id") postId:number, @Query("order") order:number){
        if(!req.file.filename){
            throw new BadRequestException()
        }
        return await this.imageService.upload(req.file.filename, +postId, +order)
    }
    
    @Delete(":id")
    @ApiResponse({
        status: HttpStatus.OK,
        type: deleteImageResponse
    })
    delete(@Param("id") id:number){
        return this.imageService.delete(+id)
    }

    @UseGuards(JwtAuthGuard)
    @Patch(":id")
    async updataImage(@Body() dto:updataImageDto,@Param("id") imageId: number, @Req() req:Request){
        const user:JwtPayload = req.user as JwtPayload
        return this.imageService.updataImage(dto, +imageId, user.id)
    }
}
