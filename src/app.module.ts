import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './post/post.module';
import { PostTextModule } from './post-text/post-text.module';
import { ImageModule } from './image/image.module';

@Module({
  imports: [UserModule, AuthModule, PrismaModule, ConfigModule.forRoot({
    isGlobal:true
  }), PostModule, PostTextModule, ImageModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
