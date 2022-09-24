/*
  Warnings:

  - Added the required column `poster` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `poster` to the `TvShow` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "poster" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TvShow" ADD COLUMN     "poster" TEXT NOT NULL;
