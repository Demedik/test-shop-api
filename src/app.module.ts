import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { UserEntity } from './common/entity/user.entity';
import { ProductEntity } from './common/entity/product.entity';
import { ProductImageEntity } from './common/entity/product-image.entity';
import { ProductOptionEntity } from './common/entity/product-option.entity';
import { ProductVariantEntity } from './common/entity/product-variant.entity';

import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),    
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [UserEntity, ProductEntity, ProductImageEntity, ProductOptionEntity, ProductVariantEntity],
      synchronize: true, 
    }),
    ProductModule,
    UserModule,
    AuthModule
  ],
})
export class AppModule {}
