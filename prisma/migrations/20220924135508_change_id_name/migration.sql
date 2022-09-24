/*
  Warnings:

  - You are about to drop the column `movieId` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `tvId` on the `TvShow` table. All the data in the column will be lost.
  - Added the required column `movieApiId` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tvApiId` to the `TvShow` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "movieId",
ADD COLUMN     "movieApiId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TvShow" DROP COLUMN "tvId",
ADD COLUMN     "tvApiId" INTEGER NOT NULL;
