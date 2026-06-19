/*
  Warnings:

  - You are about to drop the `workouts` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "SessionStatus" AS ENUM ('IN_PROGRESS', 'PAUSED', 'COMPLETED', 'ABANDONED');

-- DropTable
DROP TABLE "workouts";

-- CreateTable
CREATE TABLE "workout_sessions" (
    "id" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "workoutPlanId" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTime" TIMESTAMP(3),
    "totalTime" INTEGER,
    "status" "SessionStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workout_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "performed_sets" (
    "id" TEXT NOT NULL,
    "workoutSessionId" TEXT NOT NULL,
    "workoutPlanExerciseId" TEXT NOT NULL,
    "setNumber" INTEGER NOT NULL,
    "repsCompleted" INTEGER NOT NULL,
    "weightUsed" DOUBLE PRECISION NOT NULL,
    "restTime" INTEGER,
    "notes" TEXT,
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "performed_sets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rest_periods" (
    "id" TEXT NOT NULL,
    "workoutSessionId" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3),
    "duration" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rest_periods_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "workout_sessions" ADD CONSTRAINT "workout_sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_sessions" ADD CONSTRAINT "workout_sessions_workoutPlanId_fkey" FOREIGN KEY ("workoutPlanId") REFERENCES "workout_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "performed_sets" ADD CONSTRAINT "performed_sets_workoutSessionId_fkey" FOREIGN KEY ("workoutSessionId") REFERENCES "workout_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "performed_sets" ADD CONSTRAINT "performed_sets_workoutPlanExerciseId_fkey" FOREIGN KEY ("workoutPlanExerciseId") REFERENCES "workout_plans_exercises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rest_periods" ADD CONSTRAINT "rest_periods_workoutSessionId_fkey" FOREIGN KEY ("workoutSessionId") REFERENCES "workout_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
