import { MigrationInterface, QueryRunner } from "typeorm";

export class init131679825336209 implements MigrationInterface {
    name = "init131679825336209";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "organisation_subscription_record" ALTER COLUMN "internalSku" DROP DEFAULT`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "organisation_subscription_record" ALTER COLUMN "internalSku" SET DEFAULT 'miller-start'`
        );
    }
}
