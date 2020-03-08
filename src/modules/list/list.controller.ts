import { Post, Get, Param, Body, Query, Put, Delete, Controller } from '@nestjs/common';

import { ListEntity } from './list.entity';
import { ListService } from './list.service';
import { CreateListDto, UpdateListDto, SaveItemDto } from './dto';

import { ListQueryDto, ListDto } from '../shared/dto';
import { ItemEntity } from './item.entity';

@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get()
  findAndCountAll(@Query() queryparams: ListQueryDto): Promise<ListDto<ListEntity>> {
    return this.listService.findAndCount(queryparams);
  }

  @Get('/:id')
  findOne(@Param('id') id: number): Promise<ListEntity> {
    return this.listService.findOneBy({ id }, { relations: ['items', 'items.product'] });
  }

  @Post('/')
  create(@Body() createDto: CreateListDto): Promise<ListEntity> {
    return this.listService.create(createDto);
  }

  @Put('/:id')
  update(@Param('id') id: number, @Body() updateDto: UpdateListDto): Promise<ListEntity> {
    return this.listService.update(id, updateDto);
  }

  @Delete('/:id')
  delete(@Param('id') id: number): Promise<boolean> {
    return this.listService.destroy(id);
  }

  @Get('/:listId/item/:itemId')
  readItem(@Param('listId') listId: number, @Param('itemId') itemId: number): Promise<ItemEntity> {
    return this.listService.readItem(listId, itemId);
  }

  @Get('/:id/item')
  listItems(@Param('id') id: number): Promise<ItemEntity[]> {
    return this.listService.listItems(id);
  }

  @Post('/:id/item')
  addItem(@Param('id') id: number, @Body() addItem: SaveItemDto): Promise<ListEntity> {
    return this.listService.addItem(id, addItem);
  }

  @Delete('/:listId/item/:itemId')
  removeItem(@Param('listId') listId: number, @Param('itemId') itemId: number): Promise<boolean> {
    return this.listService.removeItem(listId, itemId);
  }
}
