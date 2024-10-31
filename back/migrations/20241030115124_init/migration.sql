/*
  Warnings:

  - Made the column `originDescription` on table `Superheroes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `catchPhrase` on table `Superheroes` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Superheroes" ALTER COLUMN "originDescription" SET NOT NULL,
ALTER COLUMN "catchPhrase" SET NOT NULL;
