import { IsString, IsBoolean } from 'class-validator';

export class UpdateExerciseDto {
  @IsString()
  name: string;

  @IsBoolean()
  status: boolean;
}
