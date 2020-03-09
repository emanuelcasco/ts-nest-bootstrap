import { BeforeUpdate, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export abstract class BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  // Timestamp DB create date
  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamp', name: 'created_at', default: 'NOW()' })
  createdAt?: Date;

  // Timestamp DB update date
  @Field(() => Date)
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', default: 'NOW()' })
  updatedAt?: Date;

  // Hook on record update action
  @BeforeUpdate()
  updateDateUpdate(): void {
    this.updatedAt = new Date();
  }
}
