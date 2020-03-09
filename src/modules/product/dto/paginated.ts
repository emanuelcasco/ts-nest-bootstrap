import { ObjectType } from 'type-graphql';

import { ProductEntity } from '../product.entity';
import { paginatedResponse } from '../../shared/dto';

@ObjectType()
export class PaginatedProductsDto extends paginatedResponse(ProductEntity) {}
