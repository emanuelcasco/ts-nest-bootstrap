import { ObjectType } from 'type-graphql';

import { CategoryEntity } from '../category.entity';
import { paginatedResponse } from '../../shared/dto';

@ObjectType()
export class PaginatedCategoriesDto extends paginatedResponse(CategoryEntity) {}
