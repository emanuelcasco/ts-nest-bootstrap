import { IsNumberString, IsString } from 'class-validator';

export class ListQueryDto {
  @IsNumberString()
  page?: number;

  @IsNumberString()
  limit?: number;

  @IsString()
  query?: string;
}
