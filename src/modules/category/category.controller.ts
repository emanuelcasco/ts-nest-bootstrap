import { Post, Get, Param, Body, Query, Put, Delete, Controller } from '@nestjs/common';

import { CategoryEntity } from './category.entity';
import { CategoryService } from './category.service';
import { CreateCategoryDto, PaginatedCategoriesDto } from './dto';

import { ListQueryDto } from '../shared/dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  findAndCountAll(@Query() queryparams: ListQueryDto): Promise<PaginatedCategoriesDto> {
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

  @Put('/:id')
  update(@Param('id') id: number, @Body() updateDto: CreateCategoryDto): Promise<CategoryEntity> {
    return this.categoryService.update(id, updateDto);
  }

  @Delete('/:id')
  delete(@Param('id') id: number): Promise<boolean> {
    return this.categoryService.destroy(id);
  }
}
