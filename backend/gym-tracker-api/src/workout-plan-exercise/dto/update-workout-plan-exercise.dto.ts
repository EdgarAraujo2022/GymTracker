import { IsString, IsBoolean } from 'class-validator';

export class UpdateWorkoutPlanExerciseDto {
  @IsString()
  exerciseId: string;
}
