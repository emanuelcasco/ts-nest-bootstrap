import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductEntity } from './product.entity';
import { CreateProductDto, FindProductDto } from './dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>
  ) {}

  async findAndCount(): Promise<{ products: ProductEntity[]; count: number }> {
    const [products, count] = await this.productRepository.findAndCount();
    return { products, count };
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
