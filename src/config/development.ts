export const config = {
  database: {
    synchronize: true,
    logging: true,
    database: process.env.DB_NAME_DEV
  },
  session: {
    secret: 'some-super-secret'
  }
};
