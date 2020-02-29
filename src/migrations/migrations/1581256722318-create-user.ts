import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class UserModel1574858958271 implements MigrationInterface {
  public up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          { name: 'id', type: 'int', isPrimary: true, generationStrategy: 'increment', isGenerated: true },
          { name: 'username', type: 'varchar' },
          { name: 'first_name', type: 'varchar' },
          { name: 'last_name', type: 'varchar' },
          { name: 'email', type: 'varchar' },
          { name: 'password', type: 'varchar' }
        ]
      })
    );
  }

  public down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropTable('users');
  }
}
