/*
  Warnings:

  - A unique constraint covering the columns `[metamaskAddress]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `users_metamaskAddress_key` ON `users`(`metamaskAddress`);
