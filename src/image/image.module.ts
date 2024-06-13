import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostService } from 'src/post/post.service';

@Module({
  controllers: [ImageController],
  providers: [ImageService, PrismaService, PostService]
})
export class ImageModule {}
