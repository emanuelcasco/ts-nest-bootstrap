import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOneOptions } from 'typeorm';

import { ListQueryDto, GenericListDto } from '../dto';
import { BaseEntity } from '../entities';
import { paginateParams } from '../helpers';

@Injectable()
export class CrudService<Entity extends BaseEntity> {
  constructor(private readonly repository: Repository<Entity>) {}

  async findAndCount(query: ListQueryDto): Promise<GenericListDto<Entity>> {
    const { skip, take, page } = paginateParams(query);
    const [records, count] = await this.repository.findAndCount({ skip, take, order: { createdAt: 'ASC' } });
    return { records, count, page, limit: take };
  }

  async findOneBy<T>(findDto: T, options: FindOneOptions<Entity> = {}): Promise<Entity> {
    const product = await this.repository.findOne(findDto, options);
    if (!product) throw new NotFoundException();
    return product;
  }

  async create<T>(createDto: T): Promise<Entity> {
    const product = await this.repository.save(createDto);
    return product;
  }

  async update<T>(id: number, updateDto: T): Promise<Entity> {
    const element = await this.findOneBy(id);
    return this.repository.save({ ...element, ...updateDto });
  }

  async destroy(id: number): Promise<boolean> {
    const element = await this.findOneBy(id);
    const result = await this.repository.delete(element.id);
    return !!result?.affected;
  }
}
