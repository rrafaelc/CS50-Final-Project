/*
  Warnings:

  - Made the column `userId` on table `Movie` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `TvShow` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Movie" DROP CONSTRAINT "Movie_userId_fkey";

-- DropForeignKey
ALTER TABLE "TvShow" DROP CONSTRAINT "TvShow_userId_fkey";

-- AlterTable
ALTER TABLE "Movie" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "TvShow" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "TvShow" ADD CONSTRAINT "TvShow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
