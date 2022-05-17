-- AlterTable
ALTER TABLE `users` ADD COLUMN `blocked` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isVerified` BOOLEAN NOT NULL DEFAULT false;
