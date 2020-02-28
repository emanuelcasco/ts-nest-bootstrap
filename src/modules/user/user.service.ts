import { Injectable } from '@nestjs/common';

import { UserEntity } from './user.entity';
import { JwtService } from './jwt.service';
import { UserRepository } from './user.repository';
import { SignupDto, LoginDto, FindUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository, private readonly jwtService: JwtService) {}

  findManyBy(): Promise<{ users: UserEntity[]; count: number }> {
    return this.userRepository.findManyBy();
  }

  findOneBy(criteria: FindUserDto): Promise<UserEntity | undefined> {
    return this.userRepository.findOneBy(criteria);
  }

  signup(signupDto: SignupDto): Promise<UserEntity> {
    return this.userRepository.signup(signupDto);
  }

  async login(loginDto: LoginDto): Promise<string> {
    const user = await this.userRepository.validateUserPassword(loginDto);
    if (user) return this.jwtService.encode(user);
    throw new Error('not valid credentials');
  }
}
