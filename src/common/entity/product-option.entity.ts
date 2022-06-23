import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { ProductEntity } from './product.entity';

@Entity('product_option')
export class ProductOptionEntity  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  position: number;

  @Column()
  values: string;

  @ManyToOne(type => ProductEntity, product => product.options)
  product: ProductEntity;
}
