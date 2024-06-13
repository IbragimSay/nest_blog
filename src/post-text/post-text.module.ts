import { Module } from '@nestjs/common';
import { PostTextService } from './post-text.service';
import { PostTextController } from './post-text.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostService } from 'src/post/post.service';

@Module({
  providers: [PostTextService, PrismaService, PostService],
  controllers: [PostTextController]
})
export class PostTextModule {}
