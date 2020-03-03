import { Controller, Post, Get, Param, Body } from '@nestjs/common';

import { ProductService } from './product.service';
import { ProductEntity } from './product.entity';
import { CreateProductDto } from './dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAndCountAll(): Promise<{ products: ProductEntity[]; count: number }> {
    return this.productService.findAndCount();
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
