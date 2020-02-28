/**
 * This type definition augments existing definition
 * from @types/express
 */
declare namespace Express {
  interface Request {
    user?: import('../modules/user/user.entity').UserEntity;
  }
  interface Response {
    user?: import('../modules/user/user.entity').UserEntity;
  }
}
