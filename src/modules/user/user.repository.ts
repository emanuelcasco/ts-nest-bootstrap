import bcrypt from 'bcryptjs';
import { EntityRepository, Repository } from 'typeorm';

import { UserEntity } from './user.entity';
import { SignupDto, LoginDto, FindUserDto } from './dto';

const SALT_ROUNDS = 10;

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async findManyBy(): Promise<{ users: UserEntity[]; count: number }> {
    const [users, count] = await this.findAndCount({
      select: ['id', 'email', 'firstName', 'lastName', 'username']
    });
    return { users, count };
  }

  async findOneBy(criteria: FindUserDto): Promise<UserEntity | undefined> {
    const user = await this.findOne({ where: criteria });
    return user;
  }

  async signup(signupDto: SignupDto): Promise<UserEntity> {
    const encryptedPass = await this.hashPassword(signupDto.password);
    return this.save({ ...signupDto, password: encryptedPass });
  }

  async validateUserPassword(credentials: LoginDto): Promise<UserEntity | null> {
    const { username, password } = credentials;
    const user = await this.findOne({ where: { username } });
    if (user) {
      const passwordValidated = await this.validatePassword(password, user.password);
      if (passwordValidated) return user;
    }
    return null;
  }

  private hashPassword(payload: string): Promise<string> {
    return bcrypt.hash(payload, SALT_ROUNDS);
  }

  private validatePassword(provided: string, persisted: string): Promise<boolean> {
    return bcrypt.compare(provided, persisted);
  }
}
