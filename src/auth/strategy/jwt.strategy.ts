import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from '../interface';
import { User } from '@prisma/client';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService:ConfigService,
    private readonly userService:UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get("SecretKey"),
    });
  }

  async validate(payload: JwtPayload) {
    if(!payload){
        throw new UnauthorizedException()
    }
    const user:User = await this.userService.findByIdOrMail(payload.id)
    if(!user){
        throw new UnauthorizedException()
    }
    return user;
  }
}