import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateProductDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  unit?: string;

  @IsNumber()
  @IsOptional()
  categoryId?: number;
}
