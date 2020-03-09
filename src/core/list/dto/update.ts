import { IsString, IsOptional } from 'class-validator';
import { InputType, Field } from 'type-graphql';

@InputType()
export class UpdateListDto {
  @Field() @IsString() @IsOptional() name?: string;
}
