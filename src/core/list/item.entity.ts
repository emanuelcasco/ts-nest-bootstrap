import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { Field, Int, ObjectType } from 'type-graphql';

import { BaseEntity } from '../shared/entities';
import { ListEntity } from './list.entity';
import { ProductEntity } from '../product/product.entity';

@ObjectType()
@Entity({ name: 'items' })
export class ItemEntity extends BaseEntity {
  @Field(() => Int)
  @Column({ nullable: true })
  quantity?: number;

  @Field()
  @Column({ nullable: true })
  notes?: string;

  @Field(() => Int)
  @Column({ name: 'product_id' })
  productId: number;

  @Field(() => Int)
  @Column({ name: 'list_id' })
  listId: number;

  @Field(() => ProductEntity)
  @ManyToOne(
    () => ProductEntity,
    product => product.items,
    { primary: true, cascade: true }
  )
  @JoinColumn({ name: 'product_id' })
  product?: ProductEntity;

  @Field(() => ListEntity)
  @ManyToOne(
    () => ListEntity,
    list => list.items,
    { primary: true }
  )
  @JoinColumn({ name: 'list_id' })
  list?: ListEntity;
}
