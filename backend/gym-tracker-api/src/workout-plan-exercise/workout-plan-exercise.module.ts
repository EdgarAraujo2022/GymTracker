import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';

import { WorkoutPlanExerciseController } from './workout-plan-exercise.controller';
import { WorkoutPlanExerciseService } from './workout-plan-exercise.service';
import { OwnershipService } from 'src/shared/services/ownership.service';

@Module({
  imports: [PrismaModule],
  controllers: [WorkoutPlanExerciseController],
  providers: [WorkoutPlanExerciseService, OwnershipService],
  exports: [WorkoutPlanExerciseService, OwnershipService ]
})
export class WorkoutPlanExerciseModule {}
