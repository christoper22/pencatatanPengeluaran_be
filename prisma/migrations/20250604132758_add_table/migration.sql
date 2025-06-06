-- CreateTable
CREATE TABLE `Wallet` (
    `id` CHAR(36) NOT NULL,
    `grupId` CHAR(36) NULL,
    `name` VARCHAR(191) NOT NULL,
    `amount` DECIMAL(65, 30) NOT NULL,
    `target_amount` DECIMAL(65, 30) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Chat` (
    `id` CHAR(36) NOT NULL,
    `userId` CHAR(36) NULL,
    `grupId` CHAR(36) NULL,
    `message` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `id` CHAR(36) NOT NULL,
    `grupId` CHAR(36) NULL,
    `date` DATETIME(3) NOT NULL,
    `amount` DECIMAL(65, 30) NOT NULL,
    `type` ENUM('IN', 'OUT') NOT NULL DEFAULT 'IN',
    `useType` ENUM('ALONE', 'TOGETHER') NOT NULL DEFAULT 'TOGETHER',
    `note` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TransactionDetail` (
    `id` CHAR(36) NOT NULL,
    `transactionId` CHAR(36) NULL,
    `userId` CHAR(36) NULL,
    `walletId` CHAR(36) NULL,
    `date` DATETIME(3) NOT NULL,
    `type` ENUM('IN', 'OUT') NOT NULL DEFAULT 'IN',
    `amount` DECIMAL(65, 30) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Wallet` ADD CONSTRAINT `Wallet_grupId_fkey` FOREIGN KEY (`grupId`) REFERENCES `Grup`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chat` ADD CONSTRAINT `Chat_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chat` ADD CONSTRAINT `Chat_grupId_fkey` FOREIGN KEY (`grupId`) REFERENCES `Grup`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_grupId_fkey` FOREIGN KEY (`grupId`) REFERENCES `Grup`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransactionDetail` ADD CONSTRAINT `TransactionDetail_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `Transaction`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransactionDetail` ADD CONSTRAINT `TransactionDetail_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransactionDetail` ADD CONSTRAINT `TransactionDetail_walletId_fkey` FOREIGN KEY (`walletId`) REFERENCES `Wallet`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
