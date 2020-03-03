import { Column, Entity, ManyToMany, ManyToOne, JoinColumn } from 'typeorm';

import { BaseEntity } from '../shared/base.entity';
import { ListEntity } from '../list/list.entity';
import { CategoryEntity } from '../category/category.entity';

@Entity({ name: 'products' })
export class ProductEntity extends BaseEntity {
  @Column('varchar', { unique: true })
  name: string;

  @ManyToMany(
    () => ListEntity,
    list => list.products
  )
  lists: ListEntity[];

  @ManyToOne(() => CategoryEntity)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @Column({ name: 'category_id', nullable: true })
  categoryId?: number;
}
