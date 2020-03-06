import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ListController } from './list.controller';
import { ListService } from './list.service';
import { ListEntity } from './list.entity';
import { ItemEntity } from './item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ListEntity, ItemEntity])],
  controllers: [ListController],
  providers: [ListService]
})
export class ListModule {}
