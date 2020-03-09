import { IsString, IsNotEmpty } from 'class-validator';
import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateListDto {
  @Field() @IsString() @IsNotEmpty() name: string;
}
