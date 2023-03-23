import { MigrationInterface, QueryRunner } from "typeorm";

export class init101679575932654 implements MigrationInterface {
    name = "init101679575932654";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "payment_session_reference" ALTER COLUMN "userUuid" DROP NOT NULL`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "payment_session_reference" ALTER COLUMN "userUuid" SET NOT NULL`
        );
    }
}
