import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { WorkoutManagerController } from './workout-manager.controller';
import { WorkoutManagerService } from './workout-manager.service';
import { ExerciseModule } from 'src/exercise/exercise.module';
import { WorkoutPlanModule } from 'src/workout-plan/workout-plan.module';
import { WorkoutTypeModule } from 'src/workout-type/workout-type.module';
import { ExerciseSetModule } from 'src/exercise-set/exercise-set.module';
import { WorkoutPlanExerciseModule } from 'src/workout-plan-exercise/workout-plan-exercise.module';
import { ExerciseTypeModule } from 'src/exercise-type/exercise-type.module';


@Module({
  imports: [PrismaModule, WorkoutTypeModule,WorkoutPlanModule,ExerciseModule,ExerciseSetModule, WorkoutPlanExerciseModule, ExerciseTypeModule],
  controllers: [WorkoutManagerController],
  providers: [WorkoutManagerService],
})
export class WorkoutManagerModule {}
