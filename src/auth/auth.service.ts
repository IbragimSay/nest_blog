import { UserService } from './../user/user.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { signupDto } from './dto';
import { hashSync } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService:UserService
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
    getHashPassword(password:string){
        return hashSync(password, 5)
    }
}
