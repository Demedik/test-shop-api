import { Controller, Post, Body, HttpException, HttpStatus, Req } from '@nestjs/common';

import { LoginUserDto } from './../../user/dto/login-user.dto';
import { CreateUserDto } from './../../user/dto/create-user.dto';
import { AuthService } from './../servives/auth.service';

import { LoginStatus, RegistrationStatus } from './../auth.constants';


import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')  
    public async register(@Body() createUserDto: CreateUserDto): Promise<RegistrationStatus> { 
        console.log(createUserDto.password);
        const result: RegistrationStatus = await this.authService.register(createUserDto);

        if (!result.success) {
            throw new HttpException(result.message, HttpStatus.BAD_REQUEST);    
        }

        return result;  
    }

    @Post('login')  
    public async login(@Body() loginUserDto: LoginUserDto): Promise<LoginStatus> {
        return await this.authService.login(loginUserDto);  
    }
}
