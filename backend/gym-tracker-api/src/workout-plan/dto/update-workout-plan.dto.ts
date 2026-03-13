import { IsString, IsBoolean } from 'class-validator';

export class UpdateWorkoutPlanDto {
  @IsString()
  name: string;

  @IsBoolean()
  status: boolean;

}
