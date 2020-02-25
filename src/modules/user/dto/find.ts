import { IsNumberString } from 'class-validator';

export class FindUserDto {
  @IsNumberString()
  id?: number;

  username?: string;

  firstName?: string;

  lastName?: string;

  email?: string;
}
