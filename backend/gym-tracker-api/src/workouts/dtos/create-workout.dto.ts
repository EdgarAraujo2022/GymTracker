import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateWorkoutDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}
