import path from 'path';

import { deepMerge } from '../utils';
import { ENVIRONMENTS } from '../constants';

const ENVIRONMENT = process.env.NODE_ENV || ENVIRONMENTS.DEVELOPMENT;

if (ENVIRONMENT !== ENVIRONMENTS.PRODUCTION) {
  // Hack! Import/Export can only be used in 'top-level code'
  // eslint-disable-next-line global-require
  require('dotenv').config();
}

const configFile = `./${ENVIRONMENT}`;
const environmentConfig = require(configFile).config;

const generatePath = (pathToResolve: string): string => path.join(__dirname, '..', pathToResolve);

const config = {
  environment: ENVIRONMENT,
  common: {
    port: process.env.PORT || 8080
  },
  database: {
    port: Number(process.env.DB_PORT) || 5432,
    hostname: process.env.DB_HOSTNAME || 'hostname',
    username: process.env.DB_USERNAME || 'username',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'database',
    type: 'postgres',
    autoLoadEntities: true,
    entities: [generatePath('./modules/**/*.{js,ts}')],
    cli: {
      migrationsDir: generatePath('./migrations/migrations')
    }
  },
  api: {
    prefix: '/',
    bodySizeLimit: Number(process.env.API_BODY_SIZE_LIMIT) || 1024 * 1024 * 10,
    parameterLimit: Number(process.env.API_PARAMETER_LIMIT) || 10000,
    port: process.env.PORT
  },
  session: {
    header_name: 'Authorization',
    secret: process.env.SESSION_SECRET as string
  },
  todosExternalApi: {
    baseUrl: process.env.TODOS_API_BASE_URL
  }
};

const customConfig: typeof config = deepMerge(config, environmentConfig);

export default customConfig;
