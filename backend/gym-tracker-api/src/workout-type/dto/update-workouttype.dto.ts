import { IsString, IsBoolean } from 'class-validator';

export class UpdateWorkoutTypeDto {
  @IsString()
  description: string;

  @IsString()
  name: string;

  @IsBoolean()
  status: boolean;
}
