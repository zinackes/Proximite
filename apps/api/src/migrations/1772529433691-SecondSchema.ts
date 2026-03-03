import { MigrationInterface, QueryRunner } from "typeorm";

export class SecondSchema1772529433691 implements MigrationInterface {
    name = 'SecondSchema1772529433691'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "test" DROP CONSTRAINT "PK_5417af0062cf987495b611b59c7"`);
        await queryRunner.query(`ALTER TABLE "test" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "test" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "test" ADD CONSTRAINT "PK_5417af0062cf987495b611b59c7" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "test" DROP CONSTRAINT "PK_5417af0062cf987495b611b59c7"`);
        await queryRunner.query(`ALTER TABLE "test" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "test" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "test" ADD CONSTRAINT "PK_5417af0062cf987495b611b59c7" PRIMARY KEY ("id")`);
    }

}
