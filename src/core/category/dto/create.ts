import { InputType, Field } from 'type-graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateCategoryDto {
  @IsString()
  @Field()
  name: string;
}
