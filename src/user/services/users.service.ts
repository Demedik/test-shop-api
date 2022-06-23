import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { UserEntity } from './../../common/entity/user.entity';
import { UserDto } from './../dto/user.dto';
import { LoginUserDto } from './../dto/login-user.dto';
import { CreateUserDto } from './../dto/create-user.dto';

import { toUserDto } from './../../common/helpers/mapper.helpers';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity)
                private userRepository: Repository<UserEntity>){}
                
    async findByLogin({ username, password }: LoginUserDto): Promise<UserDto> {    
        const user = await this.userRepository.findOne({ where: { username } });
        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);    
        }

        const areEqual = await bcrypt.compare(password, user.password);
        
        if (!areEqual) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);    
        }
        
        return toUserDto(user);  
    }

    async create(userDto: CreateUserDto): Promise<UserDto> {    
        const { username, password, email } = userDto;
  
        const userInDb = await this.userRepository.findOne({ 
            where: { username } 
        });

        if (userInDb) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);    
        }
        
        const user = new UserEntity();
        Object.assign(user, { username, password, email });

        await this.userRepository.save(user);
        return toUserDto(user);  
    }

    async findByPayload({ username }: any): Promise<UserDto> {
        return await this.userRepository.findOne({ 
            where:  { username } });  
    }
}
