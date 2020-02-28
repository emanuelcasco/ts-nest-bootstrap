import { Injectable } from '@nestjs/common';
import jwt from 'jwt-simple';

import config from '../../config';

const SECRET = config.session.secret;

@Injectable()
export class JwtService {
  encode<T>(payload: T): string {
    return jwt.encode(payload, SECRET);
  }

  decode<T>(token: string): T {
    return jwt.decode(token, SECRET);
  }
}
