/*
  Warnings:

  - You are about to drop the column `picture_Id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `picture_Url` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "picture_Id",
DROP COLUMN "picture_Url",
ADD COLUMN     "pictureId" TEXT,
ADD COLUMN     "pictureUrl" TEXT;
