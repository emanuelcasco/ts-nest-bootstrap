import { Type } from 'class-transformer';
import { IsString, ValidateNested, IsNotEmpty, IsArray } from 'class-validator';

import { CreateProductDto } from '../../product/dto';

export class CreateListDto {
  @IsString() @IsNotEmpty() name: string;

  @IsArray() @ValidateNested() @Type(() => CreateProductDto) products?: CreateProductDto[];
}
