/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationInterface, QueryRunner } from "typeorm";

export class init1676285360450 implements MigrationInterface {
    name = "init1676285360450";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "payment_session_reference" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "organisationUuid" character varying, "personUuid" character varying NOT NULL, CONSTRAINT "PK_b2840bc526ab8cda218059434ea" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_4907f10417f65fe2284c52eab2" ON "payment_session_reference" ("uuid") `
        );
        await queryRunner.query(
            `CREATE TABLE "email" ("id" SERIAL NOT NULL, "ownerId" character varying NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "to" character varying NOT NULL, "bccTo" character varying NOT NULL, "textBody" character varying NOT NULL, "htmlBody" character varying NOT NULL, "subject" character varying NOT NULL, "sentDate" TIMESTAMP, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "deletedDate" TIMESTAMP, CONSTRAINT "PK_1e7ed8734ee054ef18002e29b1c" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_69281e5c9fd2818a066d09f663" ON "email" ("ownerId") `
        );
        await queryRunner.query(
            `CREATE TABLE "membership_role" ("id" SERIAL NOT NULL, "membershipId" integer NOT NULL, "name" character varying NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), "deletedDate" TIMESTAMP, CONSTRAINT "PK_4e57152f7d33b9804afb088fc5b" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE TABLE "person" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "emailVerified" boolean NOT NULL DEFAULT false, "blocked" boolean NOT NULL DEFAULT false, "name" character varying, "familyName" character varying, "givenName" character varying, "picture" character varying NOT NULL, "auth0UserId" character varying NOT NULL, "username" character varying, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), "deletedDate" TIMESTAMP, CONSTRAINT "PK_5fdaf670315c4b7e70cce85daa3" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_1e31d698585cca81c3037120ac" ON "person" ("uuid") `
        );
        await queryRunner.query(
            `CREATE UNIQUE INDEX "IDX_ecad84c0c56a504ca839b06b85" ON "person" ("auth0UserId") `
        );
        await queryRunner.query(
            `CREATE TABLE "organisation_membership" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "personId" integer NOT NULL, "organisationId" integer NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), "deletedDate" TIMESTAMP, CONSTRAINT "PK_fc3213e972ff7b613ebc1833264" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_c1ed5dec3dd72686abbc0901f7" ON "organisation_membership" ("uuid") `
        );
        await queryRunner.query(
            `CREATE TABLE "organisation_subscription_record" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "productDisplayName" character varying NOT NULL, "paymentSystemTransactionId" character varying NOT NULL, "paymentSystemProductId" character varying NOT NULL, "paymentSystemCustomerId" character varying NOT NULL, "paymentSystemMode" character varying NOT NULL, "paymentSystemName" character varying NOT NULL, "validUntil" TIMESTAMP NOT NULL, "organisationId" integer NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "deletedDate" TIMESTAMP, CONSTRAINT "PK_9c2633ac966aba1f77584146d39" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_e31e2f04bb67322588c870b772" ON "organisation_subscription_record" ("uuid") `
        );
        await queryRunner.query(
            `CREATE TABLE "organisation" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), "deletedDate" TIMESTAMP, CONSTRAINT "PK_c725ae234ef1b74cce43d2d00c1" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_2de5cff8ecf4b18e86ab9d376e" ON "organisation" ("uuid") `
        );
        await queryRunner.query(
            `CREATE TABLE "invitation" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "givenName" character varying NOT NULL, "emailAddress" character varying NOT NULL, "notificationSent" TIMESTAMP NOT NULL, "expiresOn" TIMESTAMP NOT NULL, "acceptedOn" TIMESTAMP NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), "deletedDate" TIMESTAMP, "organisationId" integer, CONSTRAINT "PK_beb994737756c0f18a1c1f8669c" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE TABLE "stripe_checkout_event" ("id" SERIAL NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "clientReferenceId" character varying, "stripeSessionId" character varying NOT NULL, "stripeObjectType" character varying NOT NULL, "stripeObject" jsonb NOT NULL, CONSTRAINT "PK_6579d5f4a0e32634b0800eccf8b" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `ALTER TABLE "membership_role" ADD CONSTRAINT "FK_cdfc7ee8916103744bdeb898720" FOREIGN KEY ("membershipId") REFERENCES "organisation_membership"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE "organisation_membership" ADD CONSTRAINT "FK_72612f9a84f4ecdc7e7d28027a9" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE "organisation_membership" ADD CONSTRAINT "FK_3be38f1dacbe189d169072d24c1" FOREIGN KEY ("organisationId") REFERENCES "organisation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE "organisation_subscription_record" ADD CONSTRAINT "FK_932b1911802c53c16ff79c5d51e" FOREIGN KEY ("organisationId") REFERENCES "organisation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE "invitation" ADD CONSTRAINT "FK_d5ea011d4c86a1798c03886e7b6" FOREIGN KEY ("organisationId") REFERENCES "organisation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "invitation" DROP CONSTRAINT "FK_d5ea011d4c86a1798c03886e7b6"`
        );
        await queryRunner.query(
            `ALTER TABLE "organisation_subscription_record" DROP CONSTRAINT "FK_932b1911802c53c16ff79c5d51e"`
        );
        await queryRunner.query(
            `ALTER TABLE "organisation_membership" DROP CONSTRAINT "FK_3be38f1dacbe189d169072d24c1"`
        );
        await queryRunner.query(
            `ALTER TABLE "organisation_membership" DROP CONSTRAINT "FK_72612f9a84f4ecdc7e7d28027a9"`
        );
        await queryRunner.query(
            `ALTER TABLE "membership_role" DROP CONSTRAINT "FK_cdfc7ee8916103744bdeb898720"`
        );
        await queryRunner.query(`DROP TABLE "stripe_checkout_event"`);
        await queryRunner.query(`DROP TABLE "invitation"`);
        await queryRunner.query(
            `DROP INDEX "public"."IDX_2de5cff8ecf4b18e86ab9d376e"`
        );
        await queryRunner.query(`DROP TABLE "organisation"`);
        await queryRunner.query(
            `DROP INDEX "public"."IDX_e31e2f04bb67322588c870b772"`
        );
        await queryRunner.query(
            `DROP TABLE "organisation_subscription_record"`
        );
        await queryRunner.query(
            `DROP INDEX "public"."IDX_c1ed5dec3dd72686abbc0901f7"`
        );
        await queryRunner.query(`DROP TABLE "organisation_membership"`);
        await queryRunner.query(
            `DROP INDEX "public"."IDX_ecad84c0c56a504ca839b06b85"`
        );
        await queryRunner.query(
            `DROP INDEX "public"."IDX_1e31d698585cca81c3037120ac"`
        );
        await queryRunner.query(`DROP TABLE "person"`);
        await queryRunner.query(`DROP TABLE "membership_role"`);
        await queryRunner.query(
            `DROP INDEX "public"."IDX_69281e5c9fd2818a066d09f663"`
        );
        await queryRunner.query(`DROP TABLE "email"`);
        await queryRunner.query(
            `DROP INDEX "public"."IDX_4907f10417f65fe2284c52eab2"`
        );
        await queryRunner.query(`DROP TABLE "payment_session_reference"`);
    }
}
