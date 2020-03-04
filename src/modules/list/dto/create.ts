import { IsString, IsNotEmpty, Allow } from 'class-validator';

export class CreateListDto {
  @IsString() @IsNotEmpty() name: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Allow() listConnection?: any[];
}
