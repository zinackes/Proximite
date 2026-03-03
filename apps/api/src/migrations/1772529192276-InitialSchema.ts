import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1772529192276 implements MigrationInterface {
    name = 'InitialSchema1772529192276'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "test" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, CONSTRAINT "UQ_fa890441710991f23916ba85599" UNIQUE ("email"), CONSTRAINT "PK_5417af0062cf987495b611b59c7" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "test"`);
    }

}
