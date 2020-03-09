import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductHandler } from './product.handler';
import { ProductService } from './product.service';
import { ProductEntity } from './product.entity';

import { JwtService } from '../shared/services';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductHandler],
  providers: [ProductService, JwtService, ProductHandler]
})
export class ProductModule {}
