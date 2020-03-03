import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductEntity } from './product.entity';
import { CreateProductDto, FindProductDto } from './dto';

import { ListQueryDto, ListDto } from '../shared/dto';
import { paginateParams } from '../shared/paginate.helper';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>
  ) {}

  async findAndCount(query: ListQueryDto): Promise<ListDto<ProductEntity>> {
    const { skip, take, page } = paginateParams(query.page, query.limit);
    const [records, count] = await this.productRepository.findAndCount({ skip, take });
    return { records, count, page, limit: take };
  }

  async findOneBy(findDto: FindProductDto): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({ where: findDto });
    if (!product) throw new NotFoundException();
    return product;
  }

  async create(createDto: CreateProductDto): Promise<ProductEntity> {
    const product = await this.productRepository.save(createDto);
    return product;
  }
}
