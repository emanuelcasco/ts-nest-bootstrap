import { IsNumber, IsNotEmpty } from 'class-validator';

export class DeleteItemDto {
  @IsNumber()
  @IsNotEmpty()
  productId: string;
}
