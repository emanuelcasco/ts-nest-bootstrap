import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { ListQueryDto, ListDto } from '../dto';
import { BaseEntity } from '../entities';
import { paginateParams } from '../helpers';

@Injectable()
export class CrudService<Entity extends BaseEntity> {
  constructor(private readonly repository: Repository<Entity>) {}

  async findAndCount(query: ListQueryDto): Promise<ListDto<Entity>> {
    const { skip, take, page } = paginateParams(query.page, query.limit);
    const [records, count] = await this.repository.findAndCount({ skip, take });
    return { records, count, page, limit: take };
  }

  async findOneBy<T>(findDto: T): Promise<Entity> {
    const product = await this.repository.findOne({ where: findDto });
    if (!product) throw new NotFoundException();
    return product;
  }

  async create<T>(createDto: T): Promise<Entity> {
    const product = await this.repository.save(createDto);
    return product;
  }

  async update<T>(id: number, updateDto: T): Promise<Entity> {
    const element = await this.repository.findOne({ where: { id } });
    if (!element) throw new NotFoundException();
    return this.repository.save({ ...element, ...updateDto });
  }

  async destroy(id: number): Promise<boolean> {
    const element = await this.repository.findOne({ where: { id } });
    if (!element) throw new NotFoundException();
    const result = await this.repository.delete(id);
    return !!result?.affected;
  }
}
