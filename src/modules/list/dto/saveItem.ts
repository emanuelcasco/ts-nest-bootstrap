import { IsNumber, IsString, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { UpdateProductDto } from '../../product/dto';

export class SaveItemDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsNumber()
  @IsOptional()
  quantity?: number;

  @IsString()
  @IsOptional()
  notes?: string;

  @ValidateNested() @Type(() => UpdateProductDto) product: UpdateProductDto;
}
