/*
  Warnings:

  - You are about to drop the column `grupId` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `grupId` on the `Connection` table. All the data in the column will be lost.
  - You are about to drop the column `grupId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `grupId` on the `Wallet` table. All the data in the column will be lost.
  - You are about to drop the `Grup` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Chat` DROP FOREIGN KEY `Chat_grupId_fkey`;

-- DropForeignKey
ALTER TABLE `Connection` DROP FOREIGN KEY `Connection_grupId_fkey`;

-- DropForeignKey
ALTER TABLE `Grup` DROP FOREIGN KEY `Grup_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_grupId_fkey`;

-- DropForeignKey
ALTER TABLE `Wallet` DROP FOREIGN KEY `Wallet_grupId_fkey`;

-- DropIndex
DROP INDEX `Chat_grupId_fkey` ON `Chat`;

-- DropIndex
DROP INDEX `Connection_grupId_fkey` ON `Connection`;

-- DropIndex
DROP INDEX `Transaction_grupId_fkey` ON `Transaction`;

-- DropIndex
DROP INDEX `Wallet_grupId_fkey` ON `Wallet`;

-- AlterTable
ALTER TABLE `Chat` DROP COLUMN `grupId`,
    ADD COLUMN `groupId` CHAR(36) NULL;

-- AlterTable
ALTER TABLE `Connection` DROP COLUMN `grupId`,
    ADD COLUMN `groupId` CHAR(36) NULL;

-- AlterTable
ALTER TABLE `Transaction` DROP COLUMN `grupId`,
    ADD COLUMN `groupId` CHAR(36) NULL;

-- AlterTable
ALTER TABLE `Wallet` DROP COLUMN `grupId`,
    ADD COLUMN `groupId` CHAR(36) NULL;

-- DropTable
DROP TABLE `Grup`;

-- CreateTable
CREATE TABLE `Group` (
    `id` CHAR(36) NOT NULL,
    `groupName` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NOT NULL,
    `userId` CHAR(36) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Group` ADD CONSTRAINT `Group_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Wallet` ADD CONSTRAINT `Wallet_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `Group`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Connection` ADD CONSTRAINT `Connection_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `Group`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chat` ADD CONSTRAINT `Chat_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `Group`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `Group`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
