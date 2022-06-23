
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserDto } from './../../user/dto/user.dto';
import { LoginUserDto } from './../../user/dto/login-user.dto';
import { CreateUserDto } from './../../user/dto/create-user.dto';

import { UsersService } from '../../user/services/users.service';

import { JwtPayload, RegistrationStatus, LoginStatus } from './../auth.constants';


@Injectable()
export class AuthService {

    constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService ) {}

    async register(userDto: CreateUserDto): Promise<RegistrationStatus> {
        let status: RegistrationStatus = {
            success: true,   
            message: 'user registered',
        };

        try {
            await this.usersService.create(userDto);
        } catch (err) {
            status = {
                success: false,        
                message: err,
            };    
        }

        return status;  
    }

    async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {    
        const user = await this.usersService.findByLogin(loginUserDto);
        
        const token = this._createToken(user);
        
        return {
            username: user.username, ...token,    
        };  
    }
    
    private _createToken({ username }: UserDto): any {
        const user: JwtPayload = { username };    
        const accessToken = this.jwtService.sign(user, {
            secret: process.env.SECRETKEY,
            expiresIn: process.env.EXPIRESIN
        });    
        return {
            expiresIn: process.env.EXPIRESIN,
            accessToken,    
        };  
    }

    async validateUser(payload: JwtPayload): Promise<UserDto> {
        const user = await this.usersService.findByPayload(payload); 

        if (!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);    
        }    

        return user;  
    }
}
