/*
  Warnings:

  - You are about to drop the column `api_id` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `api_id` on the `TvShow` table. All the data in the column will be lost.
  - Added the required column `movieId` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tvId` to the `TvShow` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "api_id",
ADD COLUMN     "movieId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TvShow" DROP COLUMN "api_id",
ADD COLUMN     "tvId" TEXT NOT NULL;
