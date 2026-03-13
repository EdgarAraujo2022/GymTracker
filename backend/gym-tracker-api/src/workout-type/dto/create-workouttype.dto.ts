import { IsString, IsBoolean } from 'class-validator';

export class CreateWorkoutTypeDto {
  @IsString()
  description: string;

  @IsBoolean()
  status: boolean;

  @IsString()
  name: string;
}
