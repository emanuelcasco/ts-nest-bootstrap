import { Column, Entity } from 'typeorm';

import { BaseEntity } from '../shared/entities';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @Column('varchar')
  username: string;

  @Column('varchar', { name: 'first_name' })
  firstName: string;

  @Column('varchar', { name: 'last_name' })
  lastName: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  password: string;
}
