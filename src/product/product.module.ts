import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';

import { ProductEntity } from './../common/entity/product.entity';
import { ProductVariantEntity } from './../common/entity/product-variant.entity';
import { ProductOptionEntity } from './../common/entity/product-option.entity';
import { ProductImageEntity } from './../common/entity/product-image.entity';

import { ProductSevice } from './services/product.service';

import { ProductController } from './controllers/product.controller';



@Module({
  imports: [    
    TypeOrmModule.forFeature([ProductEntity, ProductImageEntity, ProductOptionEntity, ProductVariantEntity]),
    HttpModule,
    AuthModule
  ],
  controllers: [ProductController],
  providers: [ProductSevice],
})
export class ProductModule {}
