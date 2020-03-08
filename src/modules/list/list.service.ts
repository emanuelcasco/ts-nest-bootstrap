import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ListEntity } from './list.entity';
import { ItemEntity } from './item.entity';

import { CrudService } from '../shared/services';
import { SaveItemDto } from './dto';

@Injectable()
export class ListService extends CrudService<ListEntity> {
  constructor(
    @InjectRepository(ListEntity)
    private readonly listRepository: Repository<ListEntity>,
    @InjectRepository(ItemEntity)
    private readonly itemRepository: Repository<ItemEntity>
  ) {
    super(listRepository);
  }

  async readItem(listId: number, itemId: number): Promise<ItemEntity> {
    const item = await this.itemRepository.findOne(itemId, { relations: ['product'] });
    if (!item) throw new NotFoundException();
    return item;
  }

  async listItems(id: number): Promise<ItemEntity[]> {
    const list = await this.findOneBy(id, { relations: ['items', 'items.product'] });
    return list.items;
  }

  async addItem(id: number, addItemDto: SaveItemDto): Promise<ListEntity> {
    const list = await this.findOneBy({ id });
    await this.itemRepository.save({ listId: list.id, ...addItemDto });
    return this.findOneBy({ id }, { relations: ['items'] });
  }

  async removeItem(listId: number, itemId: number): Promise<boolean> {
    const list = await this.findOneBy({ id: listId });
    const item = await this.itemRepository.findOne({ where: { id: itemId, listId: list.id } });
    if (!item) throw new NotFoundException();
    const response = await this.itemRepository.delete(item.id);
    return !!response.affected;
  }
}
