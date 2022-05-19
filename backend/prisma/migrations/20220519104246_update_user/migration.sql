-- AlterTable
ALTER TABLE `users` ADD COLUMN `provider` VARCHAR(191) NOT NULL DEFAULT 'email',
    MODIFY `password_hash` VARCHAR(191) NULL;
