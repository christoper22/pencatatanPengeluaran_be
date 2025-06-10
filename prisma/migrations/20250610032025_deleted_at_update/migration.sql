-- AlterTable
ALTER TABLE `Chat` MODIFY `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Connection` MODIFY `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Group` MODIFY `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Transaction` MODIFY `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `TransactionDetail` MODIFY `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Wallet` MODIFY `deletedAt` DATETIME(3) NULL;
