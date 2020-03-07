import { Column, Entity, OneToMany } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

import { ItemEntity } from './item.entity';
import { BaseEntity } from '../shared/entities';

@ObjectType()
@Entity({ name: 'lists' })
export class ListEntity extends BaseEntity {
  @Field()
  @Column('varchar')
  name: string;

  @Field(() => [ItemEntity])
  @OneToMany(
    () => ItemEntity,
    item => item.list,
    { cascade: true }
  )
  items: ItemEntity[];
}
