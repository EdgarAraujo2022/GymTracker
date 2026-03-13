import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { WorkoutPlanController } from './workout-plan.controller';
import { WorkoutPlanService } from './workout-plan.service';
import { OwnershipService } from 'src/shared/services/ownership.service';

@Module({
  imports: [PrismaModule],
  controllers: [WorkoutPlanController],
  providers: [WorkoutPlanService, OwnershipService],
  exports: [WorkoutPlanService, OwnershipService ]
})
export class WorkoutPlanModule {}
