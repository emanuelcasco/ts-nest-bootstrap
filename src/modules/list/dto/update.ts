import { Type } from 'class-transformer';
import { IsString, ValidateNested, IsArray, IsOptional } from 'class-validator';

import { CreateProductDto } from '../../product/dto';

export class UpdateListDto {
  @IsString() @IsOptional() name?: string;

  @IsArray() @IsOptional() @ValidateNested() @Type(() => CreateProductDto) products?: CreateProductDto[];
}
