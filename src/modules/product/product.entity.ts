import { Column, Entity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

import { BaseEntity } from '../shared/entities';
import { CategoryEntity } from '../category/category.entity';
import { ItemEntity } from '../list/item.entity';

@Entity({ name: 'products' })
export class ProductEntity extends BaseEntity {
  @Column('varchar')
  name: string;

  @Column('varchar')
  unit: string;

  @Column({ name: 'category_id', nullable: true })
  categoryId?: number;

  @ManyToOne(() => CategoryEntity)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @OneToMany(
    () => ItemEntity,
    item => item.product
  )
  items: ItemEntity[];
}
