import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { zip, map } from 'rxjs';

import { ProductEntity } from '../../common/entity/product.entity';
import { ProductVariantEntity } from './../../common/entity/product-variant.entity';
import { ProductOptionEntity } from './../../common/entity/product-option.entity';
import { ProductImageEntity } from './../../common/entity/product-image.entity';

import { snakeToCamel } from '../../common/helpers/formatting.helpers';
import { SelectOptionsEnum } from './../../app.constants';

@Injectable()
export class ProductSevice {
    constructor(@InjectRepository(ProductEntity)
                private productRepository: Repository<ProductEntity>,
                @InjectRepository(ProductImageEntity)
                private imagesRepository: Repository<ProductImageEntity>,
                @InjectRepository(ProductVariantEntity)
                private variantsRepository: Repository<ProductVariantEntity>,
                @InjectRepository(ProductOptionEntity)
                private optionsReposittory: Repository<ProductOptionEntity>,
            ) {

                        }
    findAll(orderBy: SelectOptionsEnum, offset: number = 0, limit: number = 10,) {
        let order: [string, "ASC" | "DESC"] | null = null;

        switch (orderBy) {
            case SelectOptionsEnum.AZ:
                order = ['product.title', 'ASC'];
                break;
            case SelectOptionsEnum.ZA:
                order = ['product.title', 'DESC'];
                break; 
            case SelectOptionsEnum.LP:
                order = ['variants.price', 'ASC'];
                break;
            case SelectOptionsEnum.HP:
                order = ['variants.price', 'DESC'];
                break;
            default:
                order = ['product.id', 'ASC'];
        }

        return zip(this.productRepository.createQueryBuilder("product")
                    .leftJoinAndSelect('product.variants', 'variants')
                    .leftJoinAndSelect('product.images', 'images')
                    .leftJoinAndSelect('product.options', 'options')
                    .orderBy(...order)
                    .take(limit) 
                    .skip(offset) 
                    .getMany(),
                    this.productRepository.createQueryBuilder("product")
                    .select('COUNT(product.id) AS total')        
                    .getRawOne()
                ).pipe(
                    map(([products, { total }]) => ({products, total: Number(total)}))
                );
    }
    
    async createNewEntities(products = []) {
        const relations = ['images', 'options', 'variants']
        const special = ['values'];
        const ignore = ['id', 'product_id', 'featured_image', 'tags', ...special, ...relations];
        
        for (let productJSON of products){
            const newProduct = new ProductImageEntity();
            Object.keys(productJSON).reduce((acc, value) => {
                if(!ignore.includes(value)) {
                    acc[snakeToCamel(value)] = productJSON[value];
                }
                return acc
            }, newProduct);
            const product = await this.productRepository.save(newProduct);

            for(let image of productJSON.images) {
                const newImage = new ProductImageEntity();
                Object.keys(image).reduce((acc, value) => {
                    if(!ignore.includes(value)) {
                        acc[snakeToCamel(value)] = image[value];
                    }
                    return acc
                }, newImage);
                newImage['product'] = product;
                await this.imagesRepository.save(newImage);
            }

            for(let option of productJSON.options) {
                const newOption = new ProductOptionEntity();
                Object.keys(option).reduce((acc, value) => {
                    if(!ignore.includes(value)) {
                        acc[snakeToCamel(value)] = option[value];
                    } else if(special.includes(value)) {
                        acc[snakeToCamel(value)] = option[value].join(',');
                    }
                    return acc
                }, newOption);

                newOption['product'] = product;
                await this.optionsReposittory.save(newOption);
            }


            for(let variant of productJSON.variants) {
                const newVariant = new ProductVariantEntity();
                Object.keys(variant).reduce((acc, value) => {
                    if(!ignore.includes(value)) {
                        acc[snakeToCamel(value)] = variant[value];
                    }
                    return acc
                }, newVariant);
                newVariant['product'] = product;
                await this.variantsRepository.save(newVariant);
            }
        }
    }
}