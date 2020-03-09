/**
 * This type definition augments existing definition
 * from @types/express
 */
declare namespace Express {
  interface Request {
    locals: {
      user?: import('../core/user/user.entity').UserEntity;
    };
  }
  interface Response {
    locals: {
      user?: import('../core/user/user.entity').UserEntity;
    };
  }
}
