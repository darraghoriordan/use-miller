import { MigrationInterface, QueryRunner } from "typeorm";

// eslint-disable-next-line @typescript-eslint/naming-convention
export class UpdateBackendLibs1767361520239 implements MigrationInterface {
    name = "UpdateBackendLibs1767361520239";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "user_api_key" ADD "apiKey" character varying NOT NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE "user_api_key" ADD CONSTRAINT "UQ_92ab922ee0d04d90699f1f3a934" UNIQUE ("apiKey")`,
        );
        await queryRunner.query(
            `ALTER TABLE "user_api_key" ADD "description" character varying NOT NULL`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "user_api_key" DROP COLUMN "description"`,
        );
        await queryRunner.query(
            `ALTER TABLE "user_api_key" DROP CONSTRAINT "UQ_92ab922ee0d04d90699f1f3a934"`,
        );
        await queryRunner.query(
            `ALTER TABLE "user_api_key" DROP COLUMN "apiKey"`,
        );
    }
}
