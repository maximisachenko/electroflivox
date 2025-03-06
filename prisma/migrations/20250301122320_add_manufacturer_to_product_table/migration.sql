/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Variation` table. All the data in the column will be lost.
  - Added the required column `manufacturer` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "manufacturer" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Variation" DROP COLUMN "imageUrl";
