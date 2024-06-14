import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { createPostTextDto, updataPostTextDto } from './dto';
import { PostTextService } from './post-text.service';
import { Body, Controller, Delete, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { createPostTextResponse, deletePostTextResponse, updataPostTextResponse } from './response';

@Controller('post-text')
@ApiTags("post-text")
export class PostTextController {
    constructor(
        private readonly postTextService:PostTextService
    ){}
    
    @Post(":id")
        @ApiResponse({
            status: HttpStatus.OK,
            type: createPostTextResponse
        })
    save(@Body() dto:createPostTextDto, @Param("id") id:number){
        return this.postTextService.save(+id, dto)
    }

    @Patch(":id")
    @ApiResponse({
        status: HttpStatus.OK,
        type: updataPostTextResponse
    })
    updata(@Body() dto:updataPostTextDto, @Param("id") id:number ){
        return this.postTextService.updata(+id, dto)
    }

    @Delete(":id")
    @ApiResponse({
        status: HttpStatus.OK,
        type: deletePostTextResponse
    })
    delete(@Param("id") id:number){
        return this.postTextService.delete(+id)
    }
}
