import { BeforeUpdate, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // Timestamp DB create date
  @CreateDateColumn({ type: 'timestamp', name: 'created_at', default: 'NOW()' })
  createdAt?: Date;

  // Timestamp DB update date
  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', default: 'NOW()' })
  updatedAt?: Date;

  // Hook on record update action
  @BeforeUpdate()
  updateDateUpdate(): void {
    this.updatedAt = new Date();
  }
}
