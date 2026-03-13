import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WorkoutModule } from './workout/workout.module';
import { BodyMeasurementModule } from './bodymeasurements/bodymeasurement.module';
import { AuthModule } from './auth/auth.module';
import { WorkoutTypeModule } from './workout-type/workout-type.module';
import { ExerciseModule } from './exercise/exercise.module';
import { WorkoutPlanModule } from './workout-plan/workout-plan.module';
import { ExerciseTypeModule } from './exercise-type/exercise-type.module';
import { WorkoutManagerModule } from './workout-manager/workout-manager.module';
import { ExerciseSetModule } from './exercise-set/exercise-set.module';
import { WorkoutPlanExerciseModule } from './workout-plan-exercise/workout-plan-exercise.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    WorkoutModule,
    WorkoutTypeModule,
    BodyMeasurementModule,
    AuthModule,
    ExerciseSetModule,
    WorkoutPlanModule,
    ExerciseModule,
    ExerciseTypeModule,
    WorkoutManagerModule,
    WorkoutPlanExerciseModule
  ],
})
export class AppModule {}
