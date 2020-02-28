import { Body, Controller, Post, UsePipes, ValidationPipe, Res } from '@nestjs/common';
import { Response } from 'express';

import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { SignupDto, LoginDto } from './dto';

import config from '../../config';

const SESSION_HEADER_NAME = config.session.header_name;

@Controller('user')
export class UserController {
  constructor(private readonly userServie: UserService) {}

  @Post('/signup')
  @UsePipes(ValidationPipe)
  signup(@Body() signupDto: SignupDto): Promise<UserEntity | undefined> {
    return this.userServie.signup(signupDto);
  }

  @Post('/login')
  @UsePipes(ValidationPipe)
  async login(@Body() loginDto: LoginDto, @Res() res: Response): Promise<Response> {
    const token = await this.userServie.login(loginDto);
    res.set(SESSION_HEADER_NAME, token);
    return res.send({ token });
  }
}
