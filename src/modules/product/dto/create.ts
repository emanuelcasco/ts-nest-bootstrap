import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @Field()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  unit: string;

  @IsNumber()
  @Field(() => Int)
  categoryId?: number;
}
