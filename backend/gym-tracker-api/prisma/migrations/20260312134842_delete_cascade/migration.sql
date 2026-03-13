-- DropForeignKey
ALTER TABLE "workout_plans" DROP CONSTRAINT "workout_plans_workoutTypeId_fkey";

-- DropForeignKey
ALTER TABLE "workout_plans_exercises" DROP CONSTRAINT "workout_plans_exercises_workoutPlanId_fkey";

-- AddForeignKey
ALTER TABLE "workout_plans" ADD CONSTRAINT "workout_plans_workoutTypeId_fkey" FOREIGN KEY ("workoutTypeId") REFERENCES "workout_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_plans_exercises" ADD CONSTRAINT "workout_plans_exercises_workoutPlanId_fkey" FOREIGN KEY ("workoutPlanId") REFERENCES "workout_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;
