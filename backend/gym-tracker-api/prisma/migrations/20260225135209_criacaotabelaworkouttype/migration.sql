-- CreateTable
CREATE TABLE "workouttype" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" UUID NOT NULL,

    CONSTRAINT "workouttype_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "workouttype" ADD CONSTRAINT "workouttype_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
