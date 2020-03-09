import { IsNumberString, IsString, IsOptional } from 'class-validator';

export class ListQueryDto {
  @IsNumberString() @IsOptional() page?: number;

  @IsNumberString() @IsOptional() limit?: number;

  @IsString() @IsOptional() query?: string;
}
