-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(191) NOT NULL,
    "category" VARCHAR(191) NOT NULL,
    "area" VARCHAR(191) NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL PRIMARY KEY,
    "customerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" SERIAL PRIMARY KEY,
    "quantity" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL
);

-- AddForeignKey
ALTER TABLE "OrderItem" 
ADD CONSTRAINT "OrderItem_productId_fkey" 
FOREIGN KEY ("productId") REFERENCES "Product"("id") 
ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" 
ADD CONSTRAINT "OrderItem_orderId_fkey" 
FOREIGN KEY ("orderId") REFERENCES "Order"("id") 
ON DELETE RESTRICT ON UPDATE CASCADE;
