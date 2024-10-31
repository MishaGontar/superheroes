/*
  Warnings:

  - You are about to drop the column `image_data` on the `Images` table. All the data in the column will be lost.
  - Added the required column `image_path` to the `Images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalName` to the `Images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Images" DROP COLUMN "image_data",
ADD COLUMN     "image_path" TEXT NOT NULL,
ADD COLUMN     "originalName" TEXT NOT NULL;
