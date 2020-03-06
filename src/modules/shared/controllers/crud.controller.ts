import { Post, Get, Param, Body, Query, Put, Delete } from '@nestjs/common';

import { CrudService } from '../services';
import { BaseEntity } from '../entities';
import { ListQueryDto, ListDto } from '../dto';

export class CrudController<Entity extends BaseEntity, Service extends CrudService<Entity>> {
  constructor(private readonly crudService: Service) {}

  @Get()
  findAndCountAll(@Query() queryparams: ListQueryDto): Promise<ListDto<Entity>> {
    return this.crudService.findAndCount(queryparams);
  }

  @Get('/:id')
  findOne(@Param('id') id: number): Promise<Entity> {
    return this.crudService.findOneBy({ id });
  }

  @Post('/')
  create<T>(@Body() createDto: T): Promise<Entity> {
    return this.crudService.create(createDto);
  }

  @Put('/:id')
  update<T>(@Param('id') id: number, @Body() updateDto: T): Promise<Entity> {
    return this.crudService.update(id, updateDto);
  }

  @Delete('/:id')
  delete<T>(@Param('id') id: number): Promise<boolean> {
    return this.crudService.destroy(id);
  }
}
