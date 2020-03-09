/* eslint-disable @typescript-eslint/indent */
import { Post, Get, Param, Body, Query, Put, Delete, Controller } from '@nestjs/common';
import { Resolver, Args, Query as GraphqlQuery, Mutation as GraphqlMutation } from '@nestjs/graphql';

import { CategoryEntity } from './category.entity';
import { CategoryService } from './category.service';
import { CreateCategoryDto, PaginatedCategoriesDto } from './dto';

import { ListQueryDto } from '../shared/dto';

@Controller('category')
@Resolver(CategoryEntity)
export class CategoryHandler {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @GraphqlQuery(() => PaginatedCategoriesDto)
  categories(@Query() queryparams: ListQueryDto): Promise<PaginatedCategoriesDto> {
    return this.categoryService.findAndCount(queryparams);
  }

  @Get('/:id')
  @GraphqlQuery(() => CategoryEntity)
  category(@Args('id') @Param('id') id: number): Promise<CategoryEntity> {
    return this.categoryService.findOneBy({ id });
  }

  @Post('/')
  @GraphqlMutation(() => CategoryEntity)
  createCategory(@Args('category') @Body('category') category: CreateCategoryDto): Promise<CategoryEntity> {
    return this.categoryService.create(category);
  }

  @Put('/:id')
  @GraphqlMutation(() => CategoryEntity)
  updateCategory(
    @Args('id') @Param('id') id: number,
    @Args('category') @Body('category') updateDto: CreateCategoryDto
  ): Promise<CategoryEntity> {
    return this.categoryService.update(id, updateDto);
  }

  @Delete('/:id')
  @GraphqlMutation(() => Boolean)
  deleteCategory(@Args('id') @Param('id') id: number): Promise<boolean> {
    return this.categoryService.destroy(id);
  }
}
