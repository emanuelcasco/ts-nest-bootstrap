export const config = {
  database: {
    database: process.env.DB_NAME_TEST,
    synchronize: true,
    logging: true
  },
  session: {
    secret: 'some-super-secret'
  }
};
