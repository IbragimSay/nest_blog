import { AuthService } from './auth.service';
import { Body, ClassSerializerInterceptor, Controller, Get, HttpStatus, Post, Req, UnauthorizedException, UseInterceptors } from '@nestjs/common';
import { loginDto, signupDto } from './dto';
import { Request } from 'express';
import { UserResponse } from 'src/user/response';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Tokens } from './interface';

@Controller('auth')
@ApiTags("auth")
export class AuthController {
    constructor(
        private readonly authService:AuthService
    ){}

    @Post("signup")
        @ApiResponse({
            status: HttpStatus.OK,
            type: UserResponse
        })
    @UseInterceptors(ClassSerializerInterceptor)
    async signup(@Body() dto:signupDto){
        const user = await this.authService.signup(dto)
        return new UserResponse(user)
    }

    @Post("login")
        @ApiResponse({
            status: HttpStatus.OK,
            type: Tokens
        })
    login(@Body() dto:loginDto, @Req() req:Request){
        const agent = req.headers["user-agent"]
        return this.authService.login(dto, agent)
    }

    @Get("refresh-token")
    @ApiBearerAuth("refresh-token")
    @ApiResponse({
        status: HttpStatus.OK,
        type: Tokens
    })
    refreshToken(@Req() req:Request){
        const refreshToken = req.headers.authorization
        console.log(refreshToken)
        const agent = req.headers['user-agent']
        if(!refreshToken){
            throw new UnauthorizedException()
        }
        return this.authService.refreshToken(refreshToken, agent)
    }
}
