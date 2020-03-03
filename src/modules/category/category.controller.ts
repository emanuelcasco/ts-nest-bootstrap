import { Controller, Post, Get, Param, Body } from '@nestjs/common';

import { CategoryService } from './category.service';
import { CategoryEntity } from './category.entity';
import { CreateCategoryDto } from './dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  findAndCountAll(): Promise<{ categories: CategoryEntity[]; count: number }> {
    return this.categoryService.findAndCount();
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
