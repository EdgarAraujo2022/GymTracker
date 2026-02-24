/*
  Warnings:

  - A unique constraint covering the columns `[authId]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `authId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "users_email_key";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "authId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "name" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_authId_key" ON "users"("authId");
