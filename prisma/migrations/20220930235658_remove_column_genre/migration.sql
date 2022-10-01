/*
  Warnings:

  - You are about to drop the column `genre` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `genre` on the `TvShow` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "genre";

-- AlterTable
ALTER TABLE "TvShow" DROP COLUMN "genre";
