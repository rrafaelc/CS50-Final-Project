/*
  Warnings:

  - Changed the type of `episode` on the `TvShow` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `season` on the `TvShow` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "TvShow" DROP COLUMN "episode",
ADD COLUMN     "episode" INTEGER NOT NULL,
DROP COLUMN "season",
ADD COLUMN     "season" INTEGER NOT NULL;
