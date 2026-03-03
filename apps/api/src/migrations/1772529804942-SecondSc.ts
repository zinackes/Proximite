import { MigrationInterface, QueryRunner } from "typeorm";

export class SecondSc1772529804942 implements MigrationInterface {
    name = 'SecondSc1772529804942'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "test" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "test" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "test" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "test" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "test" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "test" DROP COLUMN "createdAt"`);
    }

}
