import { IsString, IsBoolean } from 'class-validator';

export class CreateExerciseDto {
  @IsString()
  name: string;

  @IsBoolean()
  status: boolean;
}
