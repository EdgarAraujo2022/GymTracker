import { IsString, IsBoolean } from 'class-validator';

export class CreateWorkoutPlanExerciseDto {
  @IsString()
  exerciseId: string;
}
