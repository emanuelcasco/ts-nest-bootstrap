import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

import { JwtService } from './jwt.service';

import { UserEntity } from '../user/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    req.user = await this.authorize(req);
    return true;
  }

  private async authorize(req: Request): Promise<UserEntity> {
    const token = req.header('Authorization');
    if (!token) throw new UnauthorizedException('Token is empty');

    const decoded = await this.jwtService.decode<UserEntity>(token);
    if (!decoded) throw new UnauthorizedException('Token provided was not valid');

    return decoded;
  }
}
