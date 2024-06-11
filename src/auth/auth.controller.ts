import { AuthService } from './auth.service';
import { Body, ClassSerializerInterceptor, Controller, Get, Post, Req, UnauthorizedException, UseInterceptors } from '@nestjs/common';
import { loginDto, signupDto } from './dto';
import { Request } from 'express';
import { UserResponse } from 'src/user/response';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService:AuthService
    ){}

    @UseInterceptors(ClassSerializerInterceptor)
    @Post("signup")
    async signup(@Body() dto:signupDto){
        const user = await this.authService.signup(dto)
        return new UserResponse(user)
    }

    @Post("login")
    login(@Body() dto:loginDto, @Req() req:Request){
        const agent = req.headers["user-agent"]
        return this.authService.login(dto, agent)
    }
    @Get("refresh-token")
    refreshToken(@Req() req:Request){
        const refreshToken = req.headers.authorization
        const agent = req.headers['user-agent']
        if(!refreshToken){
            throw new UnauthorizedException()
        }
        return this.authService.refreshToken(refreshToken, agent)
    }
}
