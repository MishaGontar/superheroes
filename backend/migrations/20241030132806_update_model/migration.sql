/*
  Warnings:

  - You are about to drop the `Superhero_Superpowers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Superpowers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `superpowers` to the `Superheroes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Superhero_Superpowers" DROP CONSTRAINT "Superhero_Superpowers_superheroId_fkey";

-- DropForeignKey
ALTER TABLE "Superhero_Superpowers" DROP CONSTRAINT "Superhero_Superpowers_superpowerId_fkey";

-- AlterTable
ALTER TABLE "Superheroes" ADD COLUMN     "superpowers" TEXT NOT NULL;

-- DropTable
DROP TABLE "Superhero_Superpowers";

-- DropTable
DROP TABLE "Superpowers";
