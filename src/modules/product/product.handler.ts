/* eslint-disable @typescript-eslint/indent */
import { Post, Get, Param, Body, Query, Put, Delete, Controller } from '@nestjs/common';
import { Resolver, Args, Query as GraphqlQuery, Mutation as GraphqlMutation } from '@nestjs/graphql';

import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';
import { CreateProductDto, PaginatedProductsDto } from './dto';

import { ListQueryDto } from '../shared/dto';

@Controller('product')
@Resolver(ProductEntity)
export class ProductHandler {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @GraphqlQuery(() => PaginatedProductsDto)
  products(@Query() queryparams: ListQueryDto): Promise<PaginatedProductsDto> {
    return this.productService.findAndCount(queryparams);
  }

  @Get('/:id')
  @GraphqlQuery(() => ProductEntity)
  product(@Args('id') @Param('id') id: number): Promise<ProductEntity> {
    return this.productService.findOneBy({ id });
  }

  @Post('/')
  @GraphqlMutation(() => ProductEntity)
  createProduct(@Args('product') @Body('product') product: CreateProductDto): Promise<ProductEntity> {
    return this.productService.create(product);
  }

  @Put('/:id')
  @GraphqlMutation(() => ProductEntity)
  updateProduct(
    @Param('id') id: number,
    @Body('product') updateDto: CreateProductDto
  ): Promise<ProductEntity> {
    return this.productService.update(id, updateDto);
  }

  @Delete('/:id')
  @GraphqlMutation(() => Boolean)
  deleteProduct(@Param('id') id: number): Promise<boolean> {
    return this.productService.destroy(id);
  }
}
