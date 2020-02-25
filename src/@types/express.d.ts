/**
 * This type definition augments existing definition
 * from @types/express
 */
declare namespace Express {
  interface Request {
    user?: import('../services/users').UserEntity;
  }
  interface Response {
    user?: import('../services/users').UserEntity;
  }
}
