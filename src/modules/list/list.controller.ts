import { Controller, Post, Get, Param, Body, Query, Put } from '@nestjs/common';

import { ListService } from './list.service';
import { ListEntity } from './list.entity';
import { CreateListDto, UpdateListDto } from './dto';

import { ListQueryDto, ListDto } from '../shared/dto';

@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get()
  findAndCountAll(@Query() queryparams: ListQueryDto): Promise<ListDto<ListEntity>> {
    return this.listService.findAndCount(queryparams);
  }

  @Get('/:id')
  findOne(@Param('id') id: number): Promise<ListEntity> {
    return this.listService.findOneBy({ id });
  }

  @Post('/')
  create(@Body() createDto: CreateListDto): Promise<ListEntity> {
    return this.listService.create(createDto);
  }

  @Put('/:id')
  update(@Param('id') id: number, @Body() updateDto: UpdateListDto): Promise<ListEntity> {
    return this.listService.update(id, updateDto);
  }
}
