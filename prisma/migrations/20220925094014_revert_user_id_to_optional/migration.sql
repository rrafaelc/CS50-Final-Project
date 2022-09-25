-- DropForeignKey
ALTER TABLE "Movie" DROP CONSTRAINT "Movie_userId_fkey";

-- DropForeignKey
ALTER TABLE "TvShow" DROP CONSTRAINT "TvShow_userId_fkey";

-- AlterTable
ALTER TABLE "Movie" ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TvShow" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "TvShow" ADD CONSTRAINT "TvShow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
