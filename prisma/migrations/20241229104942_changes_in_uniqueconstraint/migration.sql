-- DropIndex
DROP INDEX "Product_id_belongsToId_key";

-- DropIndex
DROP INDEX "Update_id_productId_key";

-- DropIndex
DROP INDEX "UpdatePoints_id_updateId_key";

-- CreateIndex
CREATE INDEX "Update_id_productId_idx" ON "Update"("id", "productId");

-- CreateIndex
CREATE INDEX "UpdatePoints_id_updateId_idx" ON "UpdatePoints"("id", "updateId");
