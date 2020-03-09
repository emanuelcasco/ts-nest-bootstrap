import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcryptjs';

import { UserEntity } from './user.entity';
import { SignupDto, LoginDto, FindUserDto } from './dto';

import { JwtService } from '../shared/services';

const SALT_ROUNDS = 10;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRespository: Repository<UserEntity>,
    private readonly jwtService: JwtService
  ) {}

  async findById(findDto: FindUserDto): Promise<UserEntity> {
    const user = await this.userRespository.findOne({ where: findDto });
    if (!user) throw new NotFoundException();
    delete user.password;
    return user;
  }

  async signup(signupDto: SignupDto): Promise<UserEntity> {
    const encryptedPass = await this.hashPassword(signupDto.password);
    return this.userRespository.save({ ...signupDto, password: encryptedPass });
  }

  async login(loginDto: LoginDto): Promise<string> {
    const { username, password } = loginDto;

    // Fetch user record
    const user = await this.userRespository.findOne({ where: { username } });
    if (!user) throw new UnauthorizedException('E-mail/password is invalid');

    // Validad provided user password
    const passwordValidated = await this.validatePassword(password, user.password);
    if (!passwordValidated) throw new UnauthorizedException('E-mail/password is invalid');

    // Return encoded user info
    delete user.password;
    return this.jwtService.encode(user);
  }

  private hashPassword(payload: string): Promise<string> {
    return bcrypt.hash(payload, SALT_ROUNDS);
  }

  private validatePassword(provided: string, persisted: string): Promise<boolean> {
    return bcrypt.compare(provided, persisted);
  }
}
