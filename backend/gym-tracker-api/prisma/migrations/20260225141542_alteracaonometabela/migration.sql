/*
  Warnings:

  - You are about to drop the `bodymeasurements` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `workouttypes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "bodymeasurements" DROP CONSTRAINT "bodymeasurements_userId_fkey";

-- DropForeignKey
ALTER TABLE "workouttypes" DROP CONSTRAINT "workouttypes_userId_fkey";

-- DropTable
DROP TABLE "bodymeasurements";

-- DropTable
DROP TABLE "workouttypes";

-- CreateTable
CREATE TABLE "body_measurements" (
    "id" SERIAL NOT NULL,
    "chest" INTEGER,
    "waist" INTEGER,
    "hips" INTEGER,
    "leftArm" INTEGER,
    "rightArm" INTEGER,
    "leftThigh" INTEGER,
    "rightThigh" INTEGER,
    "leftCalf" INTEGER,
    "rightCalf" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" UUID NOT NULL,

    CONSTRAINT "body_measurements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workout_types" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" UUID NOT NULL,

    CONSTRAINT "workout_types_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "body_measurements" ADD CONSTRAINT "body_measurements_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_types" ADD CONSTRAINT "workout_types_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
