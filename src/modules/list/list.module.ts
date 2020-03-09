import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ListHandler } from './list.handler';
import { ListService } from './list.service';
import { ListEntity } from './list.entity';
import { ItemEntity } from './item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ListEntity, ItemEntity])],
  controllers: [ListHandler],
  providers: [ListService, ListHandler]
})
export class ListModule {}
