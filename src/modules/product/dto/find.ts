import { IsNumberString, IsString } from 'class-validator';

export class FindProductDto {
  @IsNumberString()
  id?: number;

  @IsString()
  name?: string;
}
