/*
  Warnings:

  - You are about to drop the `workouttype` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "workouttype" DROP CONSTRAINT "workouttype_userId_fkey";

-- DropTable
DROP TABLE "workouttype";

-- CreateTable
CREATE TABLE "workouttypes" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" UUID NOT NULL,

    CONSTRAINT "workouttypes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "workouttypes" ADD CONSTRAINT "workouttypes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
