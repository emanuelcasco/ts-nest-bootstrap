import { Column, Entity } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

import { BaseEntity } from '../shared/entities';

@ObjectType()
@Entity({ name: 'categories' })
export class CategoryEntity extends BaseEntity {
  @Field()
  @Column('varchar', { unique: true })
  name: string;
}
