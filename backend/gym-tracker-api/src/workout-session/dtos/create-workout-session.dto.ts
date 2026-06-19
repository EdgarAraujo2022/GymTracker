import { IsDate, IsNumber, IsString, IsEnum, IsOptional } from 'class-validator';
import { SessionStatus } from '@prisma/client'; // Importe o enum do Prisma

export class CreateWorkoutSessionDto {

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