import { Controller, Post, Get, Param, Body, Query } from '@nestjs/common';

import { CategoryService } from './category.service';
import { CategoryEntity } from './category.entity';
import { CreateCategoryDto } from './dto';

import { ListQueryDto, ListDto } from '../shared/dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  findAndCountAll(@Query() queryparams: ListQueryDto): Promise<ListDto<CategoryEntity>> {
    return this.categoryService.findAndCount(queryparams);
  }

  @Get('/:id')
  findOne(@Param('id') id: number): Promise<CategoryEntity> {
    return this.categoryService.findOneBy({ id });
  }

  @Post('/')
  create(@Body() createDto: CreateCategoryDto): Promise<CategoryEntity> {
    return this.categoryService.create(createDto);
  }
}
