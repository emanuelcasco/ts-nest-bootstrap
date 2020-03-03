import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

import { JwtService } from './jwt.service';

import { UserEntity } from '../user/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    /**
     * Take JWT from Authorization header
     */
    const token = req.header('Authorization');
    if (!token) throw new UnauthorizedException('Token is empty');

    /**
     * Decode JWT<UserEntity> and persist it on request
     */
    const decoded = await this.jwtService.decode<UserEntity>(token);
    if (!decoded) throw new UnauthorizedException('Token provided was not valid');

    req.locals = { user: decoded };

    return true;
  }
}
