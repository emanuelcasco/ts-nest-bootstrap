import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductController } from './product.controller';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import { ProductEntity } from './product.entity';

import { JwtService } from '../shared/services';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductController],
  providers: [ProductService, JwtService, ProductResolver]
})
export class ProductModule {}
