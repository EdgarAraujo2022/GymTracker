import { IsString, IsBoolean } from 'class-validator';

export class CreateWorkoutPlanDto {
  @IsString()
  name: string;

  @IsBoolean()
  status: boolean;
}
