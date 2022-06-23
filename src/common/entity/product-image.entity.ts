import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { ProductEntity } from './product.entity';

@Entity('product_image')
export class ProductImageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdAt: string;

  @Column()
  position: number;

  @Column()
  updatedAt: string;

  @Column()
  src: string;

  @Column({
    nullable: true,
  })
  width: number;

  @Column({
    nullable: true,
  })
  height: number;

  @ManyToOne(type => ProductEntity, product => product.images)
  product: ProductEntity
}
