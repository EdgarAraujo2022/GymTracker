/*
  Warnings:

  - You are about to drop the `sets` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `workout_plan_exercises` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "sets" DROP CONSTRAINT "sets_sessionExerciseId_fkey";

-- DropForeignKey
ALTER TABLE "workout_plan_exercises" DROP CONSTRAINT "workout_plan_exercises_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "workout_plan_exercises" DROP CONSTRAINT "workout_plan_exercises_workoutPlanId_fkey";

-- DropTable
DROP TABLE "sets";

-- DropTable
DROP TABLE "workout_plan_exercises";

-- CreateTable
CREATE TABLE "exercise_sets" (
    "id" TEXT NOT NULL,
    "sessionExerciseId" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "reps" INTEGER NOT NULL,
    "rest" INTEGER NOT NULL,
    "muscle" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "exercise_sets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "exercise_sets" ADD CONSTRAINT "exercise_sets_sessionExerciseId_fkey" FOREIGN KEY ("sessionExerciseId") REFERENCES "session_exercises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
