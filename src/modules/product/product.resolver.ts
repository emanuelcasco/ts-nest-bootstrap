import { Resolver, Query } from '@nestjs/graphql';

import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';

@Resolver(ProductEntity)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => String)
  helloProduct(): string {
    return 'hello';
  }
}
