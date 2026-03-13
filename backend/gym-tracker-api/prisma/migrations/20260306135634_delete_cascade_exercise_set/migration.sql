-- DropForeignKey
ALTER TABLE "exercise_sets" DROP CONSTRAINT "exercise_sets_workoutPlanExerciseId_fkey";

-- AddForeignKey
ALTER TABLE "exercise_sets" ADD CONSTRAINT "exercise_sets_workoutPlanExerciseId_fkey" FOREIGN KEY ("workoutPlanExerciseId") REFERENCES "workout_plans_exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;
