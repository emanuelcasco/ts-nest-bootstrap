import { IsString, IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { CreateProductDto } from '../../product/dto';

export class CreateListDto {
  @IsString() @IsNotEmpty() name: string;

  @IsArray() @ValidateNested() @Type(() => CreateProductDto) products?: CreateProductDto[];
}
