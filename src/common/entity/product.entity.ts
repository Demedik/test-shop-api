import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { ProductImageEntity } from './product-image.entity';
import { ProductVariantEntity } from './product-variant.entity';
import { ProductOptionEntity } from './product-option.entity';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  handle: string;

  @Column()
  bodyHtml: string;

  @Column()
  publishedAt: string;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;

  @Column()
  vendor: string;

  @Column()
  productType: string;

  @OneToMany(type => ProductImageEntity, productImages => productImages.product)
  images: ProductImageEntity[];

  @OneToMany(type => ProductOptionEntity, productOption => productOption.product)
  options: ProductOptionEntity[];

  @OneToMany(type => ProductVariantEntity, productVariant => productVariant.product)
  variants: ProductVariantEntity[];
}