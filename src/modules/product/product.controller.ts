import { Post, Get, Param, Body, Query, Put, Delete, Controller } from '@nestjs/common';

import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';
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

  @Put('/:id')
  update(@Param('id') id: number, @Body() updateDto: CreateProductDto): Promise<ProductEntity> {
    return this.productService.update(id, updateDto);
  }

  @Delete('/:id')
  delete(@Param('id') id: number): Promise<boolean> {
    return this.productService.destroy(id);
  }
}
