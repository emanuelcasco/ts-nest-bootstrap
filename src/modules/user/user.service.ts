import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';

import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import { SignupDto, LoginDto, FindUserDto } from './dto';

import { JwtService } from '../shared/jwt.service';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository, private readonly jwtService: JwtService) {}

  async findById(findDto: FindUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findBy(findDto);
    if (!user) throw new NotFoundException();
    return user;
  }

  signup(signupDto: SignupDto): Promise<UserEntity> {
    return this.userRepository.signup(signupDto);
  }

  async login(loginDto: LoginDto): Promise<string> {
    const user = await this.userRepository.validateUserPassword(loginDto);
    if (user) return this.jwtService.encode(user);
    throw new UnauthorizedException('E-mail/password is invalid');
  }
}
