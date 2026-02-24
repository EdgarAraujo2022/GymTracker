import { IsInt, IsOptional } from 'class-validator';

export class CreateBodyMeasurementsDto {
  @IsInt()
  @IsOptional()
  chest?: number;

  @IsInt()
  @IsOptional()
  waist?: number;

  @IsInt()
  @IsOptional()
  hips?: number;

  @IsInt()
  @IsOptional()
  leftArm?: number;

  @IsInt()
  @IsOptional()
  rightArm?: number;

  @IsInt()
  @IsOptional()
  leftThigh?: number;

  @IsInt()
  @IsOptional()
  rightThigh?: number;

  @IsInt()
  @IsOptional()
  leftCalf?: number;

  @IsInt()
  @IsOptional()
  rightCalf?: number;
}
