import { MigrationInterface, QueryRunner } from "typeorm";

export class init121679813962929 implements MigrationInterface {
    name = "init121679813962929";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "subscription_asset" ("id" SERIAL NOT NULL, "internalSku" character varying NOT NULL, "uri" character varying NOT NULL, "description" character varying NOT NULL, "displayName" character varying NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e4f3169b9426373901f0637d631" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `ALTER TABLE "organisation_subscription_record" ADD "internalSku" character varying NOT NULL DEFAULT 'miller-start'`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "organisation_subscription_record" DROP COLUMN "internalSku"`
        );
        await queryRunner.query(`DROP TABLE "subscription_asset"`);
    }
}
