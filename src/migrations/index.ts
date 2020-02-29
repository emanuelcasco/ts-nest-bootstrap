import { Logger } from '@nestjs/common';
import { Connection } from 'typeorm';

import config from '../config';
import { ENVIRONMENTS } from '../constants';

const DEFAULT_MIGRATION_OPTIONS = { synchronize: false };

export interface MigrationOptions {
  synchronize?: boolean;
}

const logger = new Logger('MIGRATIONS-CHECKER');

export async function checkMigrations(
  connection: Connection,
  options: MigrationOptions = DEFAULT_MIGRATION_OPTIONS
): Promise<void> {
  const pendingMigrations = await connection.showMigrations();
  if (pendingMigrations) {
    logger.log(`Pending migrations for database "${config.database.database}"`);
    if (config.environment === ENVIRONMENTS.PRODUCTION || options.synchronize) {
      try {
        const migrations = await connection.runMigrations({ transaction: 'all' });
        logger.log(`${migrations.length} migrations were successfully executed`);
        return Promise.resolve();
      } catch (err) {
        logger.error(err);
        throw new Error('There are pending migrations that could not be executed');
      }
    }
    throw new Error('Pending migrations, run: npm run migrations');
  }
  logger.log(`Database "${config.database.database}" migrations are up to date`);
  return Promise.resolve();
}
