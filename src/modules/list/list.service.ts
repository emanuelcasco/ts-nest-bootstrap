import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ListEntity } from './list.entity';
import { CreateListDto, FindListDto, UpdateListDto } from './dto';

import { ListQueryDto, ListDto } from '../shared/dto';
import { paginateParams } from '../shared/helpers';

@Injectable()
export class ListService {
  constructor(@InjectRepository(ListEntity) private readonly listRepository: Repository<ListEntity>) {}

  async findAndCount(query: ListQueryDto): Promise<ListDto<ListEntity>> {
    const { skip, take, page } = paginateParams(query.page, query.limit);
    const [records, count] = await this.listRepository.findAndCount({ skip, take });
    return { records, count, page, limit: take };
  }

  async findOneBy(findDto: FindListDto): Promise<ListEntity> {
    const list = await this.listRepository.findOne({
      where: findDto,
      relations: ['items', 'items.product']
    });
    if (!list) throw new NotFoundException();
    return list;
  }

  async create(createDto: CreateListDto): Promise<ListEntity> {
    const list = await this.listRepository.save(createDto);
    return list;
  }

  async update(id: number, updateDto: UpdateListDto): Promise<ListEntity> {
    const list = await this.listRepository.findOne({ id });
    if (!list) throw new NotFoundException();
    return this.listRepository.save({ ...list, ...updateDto });
  }
}
