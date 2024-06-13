import { createPostTextDto, updataPostTextDto } from './dto';
import { PostTextService } from './post-text.service';
import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';

@Controller('post-text')
export class PostTextController {
    constructor(
        private readonly postTextService:PostTextService
    ){}
    
    @Post(":id")
    save(@Body() dto:createPostTextDto, @Param("id") id:number){
        return this.postTextService.save(+id, dto)
    }

    @Patch(":id")
    updata(@Body() dto:updataPostTextDto, @Param("id") id:number ){
        return this.postTextService.updata(+id, dto)
    }

    @Delete(":id")
    delete(@Param("id") id:number){
        return this.postTextService.delete(+id)
    }
}
