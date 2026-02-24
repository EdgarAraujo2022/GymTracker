import { IsInt, IsOptional } from 'class-validator';

export class UpdateBodyMeasurementsDto {
  @IsOptional()
  @IsInt()
  chest?: number;

  @IsOptional()
  @IsInt()
  waist?: number;

  @IsOptional()
  @IsInt()
  hips?: number;

  @IsOptional()
  @IsInt()
  leftArm?: number;

  @IsOptional()
  @IsInt()
  rightArm?: number;

  @IsOptional()
  @IsInt()
  leftThigh?: number;

  @IsOptional()
  @IsInt()
  rightThigh?: number;

  @IsOptional()
  @IsInt()
  leftCalf?: number;

  @IsOptional()
  @IsInt()
  rightCalf?: number;
}
