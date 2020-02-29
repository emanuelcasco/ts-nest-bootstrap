import path from 'path';

import { ConnectionOptions } from 'typeorm';

import config from '../config';

const generatePath = (pathToResolve: string): string => path.join(__dirname, pathToResolve);

const typeOrmConfig = {
  ...config.database,
  logging: true,
  entities: [generatePath('../modules/**/*.entity.{js,ts}')],
  migrations: [generatePath('../migrations/migrations/*.{js,ts}')],
  subscribers: [generatePath('../modules/**/*.subscriber.{js,ts}')],
  cli: { migrationsDir: generatePath('../migrations/migrations') }
} as ConnectionOptions;

export default typeOrmConfig;

module.exports = typeOrmConfig;
