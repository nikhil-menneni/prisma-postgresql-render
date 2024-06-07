/*
  Warnings:

  - A unique constraint covering the columns `[id,productId]` on the table `Update` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,updateId]` on the table `UpdatePoints` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Update_id_productId_key" ON "Update"("id", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "UpdatePoints_id_updateId_key" ON "UpdatePoints"("id", "updateId");
