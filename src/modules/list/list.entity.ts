import { Column, Entity, ManyToMany, JoinTable } from 'typeorm';

import { BaseEntity } from '../shared/entities';
import { ProductEntity } from '../product/product.entity';

@Entity({ name: 'lists' })
export class ListEntity extends BaseEntity {
  @Column('varchar')
  name: string;

  @ManyToMany(() => ProductEntity, { cascade: true })
  @JoinTable({
    name: 'list_product',
    joinColumn: { name: 'list_id' },
    inverseJoinColumn: { name: 'product_id' }
  })
  products: ProductEntity[];
}
