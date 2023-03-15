import { MigrationInterface, QueryRunner } from "typeorm";

export class init81678851309727 implements MigrationInterface {
    name = "init81678851309727";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "membership_role" DROP COLUMN "deletedDate"`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "membership_role" ADD "deletedDate" TIMESTAMP`
        );
    }
}
