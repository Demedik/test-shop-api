import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from './../common/entity/user.entity';

import { UsersService } from './services/users.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity])
    ],
    providers: [
        UsersService
    ],
    exports: [UsersService]
})
export class UserModule {}
