import { IsNumberString, IsString } from 'class-validator';

export class FindCategoryDto {
  @IsNumberString()
  id?: number;

  @IsString()
  name?: string;
}
