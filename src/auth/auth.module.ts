import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UserModule } from './../user/user.module';
import { JwtStrategy } from './servives/jwt-strategy.service';
import { AuthService } from './servives/auth.service';

import { AuthController } from './controllers/auth.controller';

@Module({  
  imports: [    
      UserModule,    
      PassportModule.register({
          defaultStrategy: 'jwt',
          property: 'user',
          session: false,
      }),
      JwtModule.register({
          secret: process.env.SECRETKEY, 
          signOptions: {
              expiresIn: process.env.EXPIRESIN,
          },
      }),
  ],  
  providers: [AuthService, JwtStrategy],  
  exports: [
      PassportModule, 
      JwtModule
  ], 
  controllers: [AuthController],
})
export class AuthModule {}
