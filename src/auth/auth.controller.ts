import { AuthService } from './auth.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { loginDto, signupDto } from './dto';

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
    login(@Body() dto:loginDto){
        return this.authService.login(dto)
    }
}
