import { Column, Entity } from 'typeorm';

import { BaseEntity } from '../shared/base.entity';

@Entity({ name: 'categories' })
export class CategoryEntity extends BaseEntity {
  @Column('varchar', { unique: true })
  name: string;
}
