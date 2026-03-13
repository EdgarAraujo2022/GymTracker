import { IsOptional, IsString } from 'class-validator';

export class UpdateWorkoutDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
