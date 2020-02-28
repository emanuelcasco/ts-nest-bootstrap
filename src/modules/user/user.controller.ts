import { Body, Controller, Get, Post, Param, UsePipes, ValidationPipe, Res } from '@nestjs/common';
import { Response } from 'express';

import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { SignupDto, LoginDto, FindUserDto } from './dto';
import config from '../../config';

const SESSION_HEADER_NAME = config.session.header_name;

@Controller('user')
export class UserController {
  constructor(private readonly userServie: UserService) {}

  @Get('/')
  findMany(): Promise<{ users: UserEntity[]; count: number }> {
    return this.userServie.findManyBy();
  }

  @Get('/:id')
  @UsePipes(ValidationPipe)
  findById(@Param() id: FindUserDto['id']): Promise<UserEntity | undefined> {
    return this.userServie.findOneBy({ id });
  }

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
