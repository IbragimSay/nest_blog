import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from './../user/user.service';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { loginDto, signupDto } from './dto';
import { compare, hashSync } from 'bcrypt';
import { Token, User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import {v4} from "uuid"
import { add } from 'date-fns';
import { Tokens } from './interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService:UserService,
        private readonly jwtService:JwtService,
        private readonly prismaService:PrismaService
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

    async login(dto:loginDto):Promise<Tokens>{
        const user:User = await this.userService.findByIdOrMail(dto.mail)
        if(!user){
            throw new UnauthorizedException()
        }
        const validPassword = await compare(dto.password, user.password)
        if(!validPassword){
            throw new UnauthorizedException()
        }
        return await this.getTokens(user)
    }

    async refreshToken(token:string):Promise<Tokens>{
        const _token:Token = await this.prismaService.token.findFirst({
            where: {
                token
            }
        })
        if(!_token){
            throw new UnauthorizedException()
        }
        const user:User = await this.prismaService.user.findFirst({
            where:{
                id: _token.userId
            }
        })
        if(!user){
            throw new UnauthorizedException()
        }
        return await this.getTokens(user)
    }

    async getRefreshToken(user:User):Promise<string>{
        const refreshToken = await this.prismaService.token.create({
            data: {
                token: v4(),
                exp: add(new Date(), {months: 1}),
                userId: user.id,
                userAgent: "userAgent"
            }
        })
        return refreshToken.token
    }

    async getTokens(user:User):Promise<Tokens>{
        const accsesToken = this.jwtService.sign({id: user.id, mail: user.mail, roles: user.roles})
        const refreshToken = await this.getRefreshToken(user)
        return {accsesToken: `Bearer ${accsesToken}`, refreshToken}
    }

    getHashPassword(password:string){
        return hashSync(password, 5)
    }
}
