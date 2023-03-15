import { MigrationInterface, QueryRunner } from "typeorm";

export class init51678786618290 implements MigrationInterface {
    name = "init51678786618290";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "email" ALTER COLUMN "textBody" DROP NOT NULL`
        );
        await queryRunner.query(
            `ALTER TABLE "email" ALTER COLUMN "htmlBody" DROP NOT NULL`
        );
        await queryRunner.query(
            `ALTER TABLE "invitation" ALTER COLUMN "acceptedOn" DROP NOT NULL`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "invitation" ALTER COLUMN "acceptedOn" SET NOT NULL`
        );
        await queryRunner.query(
            `ALTER TABLE "email" ALTER COLUMN "htmlBody" SET NOT NULL`
        );
        await queryRunner.query(
            `ALTER TABLE "email" ALTER COLUMN "textBody" SET NOT NULL`
        );
    }
}
