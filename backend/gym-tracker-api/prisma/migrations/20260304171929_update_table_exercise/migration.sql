/*
  Warnings:

  - You are about to drop the column `workoutPlanId` on the `exercise_sets` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[exerciseId,order]` on the table `exercise_sets` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `workoutPlanId` to the `exercises` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "exercise_sets" DROP CONSTRAINT "exercise_sets_workoutPlanId_fkey";

-- DropIndex
DROP INDEX "exercise_sets_workoutPlanId_exerciseId_order_key";

-- DropIndex
DROP INDEX "exercise_sets_workoutPlanId_idx";

-- AlterTable
ALTER TABLE "exercise_sets" DROP COLUMN "workoutPlanId";

-- AlterTable
ALTER TABLE "exercises" ADD COLUMN     "workoutPlanId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "exercise_sets_exerciseId_order_key" ON "exercise_sets"("exerciseId", "order");

-- AddForeignKey
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_workoutPlanId_fkey" FOREIGN KEY ("workoutPlanId") REFERENCES "workout_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
