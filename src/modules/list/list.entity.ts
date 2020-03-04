import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from '../shared/entities';
import { ItemEntity } from './item.entity';

@Entity({ name: 'lists' })
export class ListEntity extends BaseEntity {
  @Column('varchar')
  name: string;

  @OneToMany(
    () => ItemEntity,
    item => item.list,
    { cascade: true }
  )
  items: ItemEntity[];
}
