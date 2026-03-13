import { IsString, IsBoolean } from 'class-validator';

export class UpdateExerciseTypeDto {
  @IsString()
  name: string;
}
