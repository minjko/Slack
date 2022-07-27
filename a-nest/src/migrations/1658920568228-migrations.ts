import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1658761408293 implements MigrationInterface {
    name = 'migrations1658761408293'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE `mentions` RENAME COLUMN `category` To `type`',
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE `mentions` RENAME COLUMN `type` To `category`',
        );
    }
}