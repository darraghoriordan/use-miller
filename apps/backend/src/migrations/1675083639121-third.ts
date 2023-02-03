/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationInterface, QueryRunner } from "typeorm";

export class third1675083639121 implements MigrationInterface {
    name = "third1675083639121";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "organisation_subscription_record" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "stripeSubscriptionId" character varying NOT NULL, "stripeCustomerId" character varying NOT NULL, "stripePriceId" character varying NOT NULL, "validUntil" character varying NOT NULL, "organisationId" integer NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9c2633ac966aba1f77584146d39" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_e31e2f04bb67322588c870b772" ON "organisation_subscription_record" ("uuid") `
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_2de5cff8ecf4b18e86ab9d376e" ON "organisation" ("uuid") `
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_1e31d698585cca81c3037120ac" ON "person" ("uuid") `
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_c1ed5dec3dd72686abbc0901f7" ON "organisation_membership" ("uuid") `
        );
        await queryRunner.query(
            `ALTER TABLE "organisation_subscription_record" ADD CONSTRAINT "FK_932b1911802c53c16ff79c5d51e" FOREIGN KEY ("organisationId") REFERENCES "organisation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "organisation_subscription_record" DROP CONSTRAINT "FK_932b1911802c53c16ff79c5d51e"`
        );
        await queryRunner.query(
            `DROP INDEX "public"."IDX_c1ed5dec3dd72686abbc0901f7"`
        );
        await queryRunner.query(
            `DROP INDEX "public"."IDX_1e31d698585cca81c3037120ac"`
        );
        await queryRunner.query(
            `DROP INDEX "public"."IDX_2de5cff8ecf4b18e86ab9d376e"`
        );
        await queryRunner.query(
            `DROP INDEX "public"."IDX_e31e2f04bb67322588c870b772"`
        );
        await queryRunner.query(
            `DROP TABLE "organisation_subscription_record"`
        );
    }
}
