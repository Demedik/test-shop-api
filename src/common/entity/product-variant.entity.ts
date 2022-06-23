import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { ProductEntity } from './product.entity';

@Entity('product_variant')
export class ProductVariantEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({
    nullable: true,
  })
  option1: string;

  @Column({
    nullable: true,
  })
  option2: string;

  @Column({
    nullable: true,
  })
  option3: string;

  @Column()
  sku: string;

  @Column()
  requiresShipping: boolean;

  @Column()
  taxable: boolean;

  @Column({
    nullable: true,
  })
  featuredImage: string;

  @Column()
  available: boolean;

  @Column()
  price: number;

  @Column()
  grams: number;

  @Column({
    nullable: true,
  })
  compareAtPrice: string;

  @Column()
  position: number;

  @ManyToOne(type => ProductEntity, product => product.variants)
  product: ProductEntity;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;
}
