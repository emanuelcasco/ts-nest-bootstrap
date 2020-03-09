import { ObjectType, ClassType, Field, Int } from 'type-graphql';

export interface GenericListDto<Entity> {
  records: Entity[];
  page: number;
  limit: number;
  count: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function paginatedResponse<Entity>(EntityClass: ClassType<Entity>): any {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseClass implements GenericListDto<Entity> {
    @Field(() => [EntityClass])
    records: Entity[];

    @Field(() => Int)
    page: number;

    @Field(() => Int)
    limit: number;

    @Field(() => Int)
    count: number;
  }
  return PaginatedResponseClass;
}
