import path from 'path';

import { ConnectionOptions } from 'typeorm';

import config from '../config';

const generatePath = (pathToResolve: string): string => path.join(__dirname, pathToResolve);

const typeOrmConfig = {
  ...config.database,
  entities: [generatePath('../core/**/*.entity.{js,ts}')],
  migrations: [generatePath('../migrations/migrations/*.{js,ts}')],
  subscribers: [generatePath('../core/**/*.subscriber.{js,ts}')],
  cli: { migrationsDir: generatePath('../migrations/migrations') }
} as ConnectionOptions;

export default typeOrmConfig;

module.exports = typeOrmConfig;
