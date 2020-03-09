import { Column, Entity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Field, ObjectType, Int } from 'type-graphql';

import { BaseEntity } from '../shared/entities';
import { ItemEntity } from '../list/item.entity';
import { CategoryEntity } from '../category/category.entity';

@ObjectType()
@Entity({ name: 'products' })
export class ProductEntity extends BaseEntity {
  @Field()
  @Column('varchar')
  name: string;

  @Field()
  @Column('varchar')
  unit: string;

  @Field(() => Int)
  @Column({ name: 'category_id', nullable: true })
  categoryId?: number;

  @Field(() => CategoryEntity)
  @ManyToOne(() => CategoryEntity)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @Field(() => [ItemEntity])
  @OneToMany(
    () => ItemEntity,
    item => item.product
  )
  items: ItemEntity[];
}
