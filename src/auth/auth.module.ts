import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { options } from './config';
import { JwtStrategy } from './strategy';
import { JwtAuthGuard } from './guard';

@Module({
  providers: [AuthService, PrismaService, UserService, JwtStrategy, JwtAuthGuard],
  controllers: [AuthController],
  imports: [JwtModule.registerAsync(options())]
})
export class AuthModule {}
