import { SessionStatus } from '@prisma/client';
import { IsDate, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateWorkoutSessionDto {
  @IsString()
  workoutPlanId: string;

  @IsDate()
  @IsOptional()
  startTime?: Date;

  @IsDate()
  @IsOptional()
  endTime?: Date;

  @IsNumber()
  @IsOptional()
  totalTime?: number;

  @IsEnum(SessionStatus)
  @IsOptional()
  status?: SessionStatus;

  @IsString()
  @IsOptional()
  notes?: string;
}
