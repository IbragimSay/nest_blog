import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import { BadRequestException, Controller, Delete, HttpStatus, Param, Post, Query, Req, UseInterceptors } from '@nestjs/common';
import { diskStorage } from 'multer';
import { Request } from 'express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { createImageResponse, deleteImageResponse } from './response';

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
}
