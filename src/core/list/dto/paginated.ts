import { ObjectType } from 'type-graphql';

import { ListEntity } from '../list.entity';
import { paginatedResponse } from '../../shared/dto';

@ObjectType()
export class PaginatedListsDto extends paginatedResponse(ListEntity) {}
