import { UserDto } from './../../user/dto/user.dto';
import { UserEntity } from './../entity/user.entity';

export const toUserDto = (data: UserEntity): UserDto => {  
    const { id, username, email } = data;
    let userDto: UserDto = { id, username, email,  };
    return userDto;
};