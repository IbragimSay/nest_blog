import {ConfigService } from "@nestjs/config";
import { JwtModuleAsyncOptions, JwtModuleOptions } from "@nestjs/jwt";

const getJwtModuleOptions = (config:ConfigService):JwtModuleOptions=>({
    secret: config.get("SecretKey"),
    signOptions: {
        expiresIn: config.get("exp")
    }
})

export const options = ():JwtModuleAsyncOptions=>({
    inject: [ConfigService],
    useFactory: (config:ConfigService)=>{
        return getJwtModuleOptions(config)
    }
})