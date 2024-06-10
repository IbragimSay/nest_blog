import { AuthService } from './auth.service';
import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { loginDto, signupDto } from './dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService:AuthService
    ){}

    
    @Post("signup")
    signup(@Body() dto:signupDto){
        return this.authService.signup(dto)
    }

    @Post("login")
    login(@Body() dto:loginDto, @Req() req:Request){
        const agent = req.headers["user-agent"]
        return this.authService.login(dto, agent)
    }
}
