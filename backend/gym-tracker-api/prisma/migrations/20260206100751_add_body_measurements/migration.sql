-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bodymeasurements" (
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
    "userId" INTEGER NOT NULL,

    CONSTRAINT "bodymeasurements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "bodymeasurements" ADD CONSTRAINT "bodymeasurements_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
