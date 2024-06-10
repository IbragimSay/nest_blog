import { UserService } from './../user/user.service';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { loginDto, signupDto } from './dto';
import { compare, hashSync } from 'bcrypt';
import { User } from '@prisma/client';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService:UserService,
        private readonly jwtService:JwtService
    ){}

    async signup(dto:signupDto){
        const validMail = await this.userService.findByIdOrMail(dto.mail)
        const validUserName = await this.userService.findByUserName(dto.userName)
        if(validMail || validUserName){
            throw new BadRequestException()
        }
        const hashPassword = this.getHashPassword(dto.password)
        return await this.userService.save({
            mail: dto.mail,
            password: hashPassword,
            userName: dto.userName
        })
    }

    async login(dto:loginDto){
        const user:User = await this.userService.findByIdOrMail(dto.mail)
        if(!user){
            throw new UnauthorizedException()
        }
        const validPassword = await compare(dto.password, user.password)
        if(!validPassword){
            throw new UnauthorizedException()
        }
        const accsesToken = this.jwtService.sign({user})
        return {accsesToken}
    }
    
    getHashPassword(password:string){
        return hashSync(password, 5)
    }
}
