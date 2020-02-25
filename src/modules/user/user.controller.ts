import { Body, Controller, Get, Post, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { CreateUserDto, FindUserDto } from './dto';

@Controller('user')
export class UserController {
  constructor(private readonly userServie: UserService) {}

  @Get('/')
  findAll(): Promise<{ users: UserEntity[]; count: number }> {
    return this.userServie.findAll();
  }

  @Get('/:id')
  @UsePipes(ValidationPipe)
  findById(@Param() params: FindUserDto): Promise<UserEntity | undefined> {
    return this.userServie.findOne({ id: params.id });
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  create(@Body() userData: CreateUserDto): Promise<UserEntity | undefined> {
    return this.userServie.create(userData);
  }
}
