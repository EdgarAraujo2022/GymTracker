/*
  Warnings:

  - You are about to drop the column `sessionExerciseId` on the `exercise_sets` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[workoutPlanId,exerciseId,order]` on the table `exercise_sets` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `exerciseId` to the `exercise_sets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sets` to the `exercise_sets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workoutPlanId` to the `exercise_sets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "exercise_sets" DROP CONSTRAINT "exercise_sets_sessionExerciseId_fkey";

-- AlterTable
ALTER TABLE "exercise_sets" DROP COLUMN "sessionExerciseId",
ADD COLUMN     "exerciseId" TEXT NOT NULL,
ADD COLUMN     "sets" INTEGER NOT NULL,
ADD COLUMN     "workoutPlanId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "exercise_sets_exerciseId_idx" ON "exercise_sets"("exerciseId");

-- CreateIndex
CREATE INDEX "exercise_sets_workoutPlanId_idx" ON "exercise_sets"("workoutPlanId");

-- CreateIndex
CREATE UNIQUE INDEX "exercise_sets_workoutPlanId_exerciseId_order_key" ON "exercise_sets"("workoutPlanId", "exerciseId", "order");

-- AddForeignKey
ALTER TABLE "exercise_sets" ADD CONSTRAINT "exercise_sets_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise_sets" ADD CONSTRAINT "exercise_sets_workoutPlanId_fkey" FOREIGN KEY ("workoutPlanId") REFERENCES "workout_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
