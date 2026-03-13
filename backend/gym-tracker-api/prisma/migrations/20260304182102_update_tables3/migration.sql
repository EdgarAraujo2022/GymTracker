/*
  Warnings:

  - You are about to drop the column `exerciseId` on the `exercise_sets` table. All the data in the column will be lost.
  - You are about to drop the column `workoutPlanId` on the `exercises` table. All the data in the column will be lost.
  - You are about to drop the `session_exercises` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `workout_sessions` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `workoutPlanExerciseId` to the `exercise_sets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "exercise_sets" DROP CONSTRAINT "exercise_sets_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "exercises" DROP CONSTRAINT "exercises_workoutPlanId_fkey";

-- DropForeignKey
ALTER TABLE "session_exercises" DROP CONSTRAINT "session_exercises_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "session_exercises" DROP CONSTRAINT "session_exercises_workoutSessionId_fkey";

-- DropForeignKey
ALTER TABLE "workout_sessions" DROP CONSTRAINT "workout_sessions_workoutPlanId_fkey";

-- DropIndex
DROP INDEX "exercise_sets_exerciseId_idx";

-- DropIndex
DROP INDEX "exercise_sets_exerciseId_order_key";

-- AlterTable
ALTER TABLE "exercise_sets" DROP COLUMN "exerciseId",
ADD COLUMN     "workoutPlanExerciseId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "exercises" DROP COLUMN "workoutPlanId";

-- DropTable
DROP TABLE "session_exercises";

-- DropTable
DROP TABLE "workout_sessions";

-- CreateTable
CREATE TABLE "workout_plans_exercises" (
    "id" TEXT NOT NULL,
    "workoutPlanId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,

    CONSTRAINT "workout_plans_exercises_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "workout_plans_exercises" ADD CONSTRAINT "workout_plans_exercises_workoutPlanId_fkey" FOREIGN KEY ("workoutPlanId") REFERENCES "workout_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_plans_exercises" ADD CONSTRAINT "workout_plans_exercises_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise_sets" ADD CONSTRAINT "exercise_sets_workoutPlanExerciseId_fkey" FOREIGN KEY ("workoutPlanExerciseId") REFERENCES "workout_plans_exercises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
