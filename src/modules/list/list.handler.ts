/* eslint-disable @typescript-eslint/indent */
import { Post, Get, Param, Body, Query, Put, Delete, Controller } from '@nestjs/common';
import { Resolver, Args, Query as GraphqlQuery, Mutation as GraphqlMutation } from '@nestjs/graphql';

import { ListEntity } from './list.entity';
import { ItemEntity } from './item.entity';
import { ListService } from './list.service';
import { CreateListDto, UpdateListDto, SaveItemDto, PaginatedListsDto } from './dto';

import { ListQueryDto } from '../shared/dto';

@Controller('list')
@Resolver(() => ListEntity)
export class ListHandler {
  constructor(private readonly listService: ListService) {}

  @Get()
  @GraphqlQuery(() => PaginatedListsDto)
  lists(@Query() queryparams: ListQueryDto): Promise<PaginatedListsDto> {
    return this.listService.findAndCount(queryparams);
  }

  @Get('/:id')
  @GraphqlQuery(() => ListEntity)
  list(@Args('id') @Param('id') id: number): Promise<ListEntity> {
    return this.listService.findOneBy({ id }, { relations: ['items', 'items.product'] });
  }

  @Post('/')
  @GraphqlMutation(() => ListEntity)
  createList(@Args('list') @Body('list') list: CreateListDto): Promise<ListEntity> {
    return this.listService.create(list);
  }

  @Put('/:id')
  @GraphqlMutation(() => ListEntity)
  updateList(
    @Args('id') @Param('id') id: number,
    @Args('list') @Body('list') list: UpdateListDto
  ): Promise<ListEntity> {
    return this.listService.update(id, list);
  }

  @Delete('/:id')
  @GraphqlMutation(() => Boolean)
  deleteList(@Args('id') @Param('id') id: number): Promise<boolean> {
    return this.listService.destroy(id);
  }

  @Get('/:listId/item/:itemId')
  @GraphqlMutation(() => ItemEntity)
  listItem(
    @Args('listId') @Param('listId') listId: number,
    @Args('itemId') @Param('itemId') itemId: number
  ): Promise<ItemEntity> {
    return this.listService.readItem(listId, itemId);
  }

  @Get('/:id/item')
  @GraphqlMutation(() => [ItemEntity])
  listItems(@Args('id') @Param('id') id: number): Promise<ItemEntity[]> {
    return this.listService.listItems(id);
  }

  @Post('/:id/item')
  @GraphqlMutation(() => ListEntity)
  addItemToList(@Args('id') @Param('id') id: number, @Body() addItem: SaveItemDto): Promise<ListEntity> {
    return this.listService.addItem(id, addItem);
  }

  @Delete('/:listId/item/:itemId')
  @GraphqlMutation(() => ListEntity)
  removeItemFromList(
    @Args('listId') @Param('listId') listId: number,
    @Args('itemId') @Param('itemId') itemId: number
  ): Promise<boolean> {
    return this.listService.removeItem(listId, itemId);
  }
}
