import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CategoryEntity } from './category.entity';
import { CreateCategoryDto, FindCategoryDto } from './dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity) private readonly categoryRepository: Repository<CategoryEntity>
  ) {}

  async findAndCount(): Promise<{ categories: CategoryEntity[]; count: number }> {
    const [categories, count] = await this.categoryRepository.findAndCount();
    return { categories, count };
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
