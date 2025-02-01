import { MigrationInterface, QueryRunner } from "typeorm";

// eslint-disable-next-line @typescript-eslint/naming-convention
export class LatestNestBackendLibs1738363713240 implements MigrationInterface {
    name = "LatestNestBackendLibs1738363713240";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "organisation_membership" ADD "deletedDate" TIMESTAMP`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "organisation_membership" DROP COLUMN "deletedDate"`,
        );
    }
}
