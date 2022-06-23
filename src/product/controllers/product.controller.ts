import { Get, Controller, HttpService, Query, UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { map } from 'rxjs';

import { ProductSevice } from '../services/product.service';

@Controller('product')
export class ProductController {

  constructor(private readonly productSevice: ProductSevice, private readonly httpService: HttpService) {}

  @Get('all')
  findAll(@Query('orderBy') orderBy, @Query('offset') offset) {
    return this.productSevice.findAll(orderBy, offset);
  }

  @UseGuards(AuthGuard())
  @Get('fill-db')
  getProductsFromThirdParty() {
  return this.httpService.get('https://efuktshirts.com/products.json').pipe(
    map( ({data}) => {
      this.productSevice.createNewEntities(data.products);
      return data
    })
  )
  }
}