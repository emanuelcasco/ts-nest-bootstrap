import { Controller, Post, Get, Param, Body, Query } from '@nestjs/common';

import { ProductService } from './product.service';
import { ProductEntity } from './product.entity';
import { CreateProductDto } from './dto';

import { ListQueryDto, ListDto } from '../shared/dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAndCountAll(@Query() queryparams: ListQueryDto): Promise<ListDto<ProductEntity>> {
    return this.productService.findAndCount(queryparams);
  }

  @Get('/:id')
  findOne(@Param('id') id: number): Promise<ProductEntity> {
    return this.productService.findOneBy({ id });
  }

  @Post('/')
  create(@Body() createDto: CreateProductDto): Promise<ProductEntity> {
    return this.productService.create(createDto);
  }
}
