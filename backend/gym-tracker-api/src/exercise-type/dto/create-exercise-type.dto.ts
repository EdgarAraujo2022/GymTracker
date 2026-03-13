import { IsString, IsBoolean } from 'class-validator';

export class CreateExerciseTypeDto {
  @IsString()
  name: string;
}
