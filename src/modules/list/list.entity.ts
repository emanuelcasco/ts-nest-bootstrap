import { Column, Entity, OneToMany } from 'typeorm';

import { ItemEntity } from './item.entity';
import { BaseEntity } from '../shared/entities';

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
