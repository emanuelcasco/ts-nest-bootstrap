import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';

import { BaseEntity } from '../shared/entities';
import { ListEntity } from './list.entity';
import { ProductEntity } from '../product/product.entity';

@Entity({ name: 'items' })
export class ItemEntity extends BaseEntity {
  @Column()
  quantity: number;

  @Column({ nullable: true })
  notes: string;

  @Column({ name: 'product_id' })
  productId: string;

  @Column({ name: 'list_id' })
  listId: string;

  @ManyToOne(
    () => ProductEntity,
    product => product.items,
    { primary: true, cascade: true }
  )
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @ManyToOne(
    () => ListEntity,
    list => list.items,
    { primary: true }
  )
  @JoinColumn({ name: 'list_id' })
  list: ListEntity;
}
