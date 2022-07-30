/*
  Warnings:

  - The primary key for the `absences` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `businessunit` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `comapny` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `employee` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `timelogs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `absences` DROP FOREIGN KEY `Absences_employeeId_fkey`;

-- DropForeignKey
ALTER TABLE `businessunit` DROP FOREIGN KEY `BusinessUnit_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `employee` DROP FOREIGN KEY `Employee_businessUnitId_fkey`;

-- DropForeignKey
ALTER TABLE `timelogs` DROP FOREIGN KEY `Timelogs_employeeId_fkey`;

-- AlterTable
ALTER TABLE `absences` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `absenceType` ENUM('SICKLEAVE', 'HOLIDAYLEAVE', 'AWOL') NOT NULL DEFAULT 'HOLIDAYLEAVE',
    MODIFY `employeeId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `businessunit` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `companyId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `comapny` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `employee` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `businessUnitId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `timelogs` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `employeeId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `role` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER',
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `BusinessUnit` ADD CONSTRAINT `BusinessUnit_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Comapny`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_businessUnitId_fkey` FOREIGN KEY (`businessUnitId`) REFERENCES `BusinessUnit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Timelogs` ADD CONSTRAINT `Timelogs_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Absences` ADD CONSTRAINT `Absences_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
