import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './user.entity';
import { CreateUserDto, FindUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async findAll(): Promise<{ users: UserEntity[]; count: number }> {
    const [users, count] = await this.userRepository.findAndCount();
    return { users, count };
  }

  async findOne(where: FindUserDto): Promise<UserEntity | undefined> {
    const user = await this.userRepository.findOne({ where });
    return user;
  }

  async create(userParams: CreateUserDto): Promise<UserEntity | undefined> {
    const user = await this.userRepository.save(userParams);
    return user;
  }
}
