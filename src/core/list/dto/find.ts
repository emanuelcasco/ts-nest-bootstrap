import { IsNumberString, IsString } from 'class-validator';

export class FindListDto {
  @IsNumberString()
  id?: number;

  @IsString()
  name?: string;
}
