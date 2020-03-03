import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CategoryEntity } from './category.entity';
import { CreateCategoryDto, FindCategoryDto } from './dto';

import { ListQueryDto, ListDto } from '../shared/dto';
import { paginateParams } from '../shared/helpers';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>
  ) {}

  async findAndCount(query: ListQueryDto): Promise<ListDto<CategoryEntity>> {
    const { skip, take, page } = paginateParams(query.page, query.limit);
    const [records, count] = await this.categoryRepository.findAndCount({ skip, take });
    return { records, count, limit: take, page };
  }

  async findOneBy(findDto: FindCategoryDto): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({ where: findDto });
    if (!category) throw new NotFoundException();
    return category;
  }

  async create(createDto: CreateCategoryDto): Promise<CategoryEntity> {
    const category = await this.categoryRepository.save(createDto);
    return category;
  }
}
