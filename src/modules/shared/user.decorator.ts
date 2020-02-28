import { createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import { UserEntity } from '../user/user.entity';

export const User = createParamDecorator(
  (data: string, request: Request): UserEntity | undefined =>
    request.user && (data ? request.user[data] : request.user)
);
