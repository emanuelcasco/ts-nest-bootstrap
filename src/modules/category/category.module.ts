import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryHandler } from './category.handler';
import { CategoryService } from './category.service';
import { CategoryEntity } from './category.entity';

import { JwtService } from '../shared/services';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  controllers: [CategoryHandler],
  providers: [CategoryService, JwtService, CategoryHandler]
})
export class CategoryModule {}
