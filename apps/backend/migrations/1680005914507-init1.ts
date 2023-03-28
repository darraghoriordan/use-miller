import { MigrationInterface, QueryRunner } from "typeorm";

export class init11680005914507 implements MigrationInterface {
    name = "init11680005914507";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "payment_session_reference" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "organisationUuid" character varying, "userUuid" character varying, CONSTRAINT "PK_b2840bc526ab8cda218059434ea" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_4907f10417f65fe2284c52eab2" ON "payment_session_reference" ("uuid") `
        );
        await queryRunner.query(
            `CREATE TABLE "subscription_asset" ("id" SERIAL NOT NULL, "internalSku" character varying NOT NULL, "uri" character varying NOT NULL, "description" character varying NOT NULL, "displayName" character varying NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e4f3169b9426373901f0637d631" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE TABLE "stripe_checkout_event" ("id" SERIAL NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "clientReferenceId" character varying, "stripeSessionId" character varying NOT NULL, "stripeObjectType" character varying NOT NULL, "stripeObject" jsonb NOT NULL, CONSTRAINT "PK_6579d5f4a0e32634b0800eccf8b" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE TABLE "email" ("id" SERIAL NOT NULL, "ownerId" character varying NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "to" character varying NOT NULL, "bccTo" character varying NOT NULL, "textBody" character varying, "htmlBody" character varying, "subject" character varying NOT NULL, "sentDate" TIMESTAMP, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "deletedDate" TIMESTAMP, CONSTRAINT "PK_1e7ed8734ee054ef18002e29b1c" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_69281e5c9fd2818a066d09f663" ON "email" ("ownerId") `
        );
        await queryRunner.query(
            `CREATE TABLE "org_github_user" ("id" SERIAL NOT NULL, "orgUuid" character varying NOT NULL, "ghUsername" character varying NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cf49c458ad4a5d034673f08d081" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE TABLE "invitation" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "givenName" character varying NOT NULL, "emailAddress" character varying NOT NULL, "notificationSent" TIMESTAMP, "expiresOn" TIMESTAMP NOT NULL, "acceptedOn" TIMESTAMP, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), "deletedDate" TIMESTAMP, "organisationMembershipId" integer, CONSTRAINT "PK_beb994737756c0f18a1c1f8669c" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE TABLE "membership_role" ("id" SERIAL NOT NULL, "membershipId" integer NOT NULL, "name" character varying NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4e57152f7d33b9804afb088fc5b" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE TABLE "organisation_subscription_record" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "internalSku" character varying NOT NULL, "productDisplayName" character varying NOT NULL, "paymentSystemTransactionId" character varying NOT NULL, "paymentSystemProductId" character varying NOT NULL, "paymentSystemCustomerId" character varying NOT NULL, "paymentSystemCustomerEmail" character varying NOT NULL, "paymentSystemMode" character varying NOT NULL, "paymentSystemName" character varying NOT NULL, "validUntil" TIMESTAMP NOT NULL, "organisationId" integer NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "deletedDate" TIMESTAMP, CONSTRAINT "PK_9c2633ac966aba1f77584146d39" PRIMARY KEY ("id"))`
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
            `CREATE TABLE "user_api_key" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), "deletedDate" TIMESTAMP, "userId" integer, CONSTRAINT "PK_9180f9a158e8cda6864358cd462" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_dd5659adb53e896b65e793f713" ON "user_api_key" ("uuid") `
        );
        await queryRunner.query(
            `CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "emailVerified" boolean NOT NULL DEFAULT false, "blocked" boolean NOT NULL DEFAULT false, "name" character varying, "familyName" character varying, "givenName" character varying, "picture" character varying, "auth0UserId" character varying, "username" character varying, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), "deletedDate" TIMESTAMP, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_a95e949168be7b7ece1a2382fe" ON "user" ("uuid") `
        );
        await queryRunner.query(
            `CREATE UNIQUE INDEX "IDX_12ba05413227b872a69d810cfc" ON "user" ("auth0UserId") `
        );
        await queryRunner.query(
            `CREATE TABLE "organisation_membership" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" integer NOT NULL, "organisationId" integer NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), "deletedDate" TIMESTAMP, CONSTRAINT "PK_fc3213e972ff7b613ebc1833264" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_c1ed5dec3dd72686abbc0901f7" ON "organisation_membership" ("uuid") `
        );
        await queryRunner.query(
            `ALTER TABLE "invitation" ADD CONSTRAINT "FK_df447ab611f96137545edd40775" FOREIGN KEY ("organisationMembershipId") REFERENCES "organisation_membership"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE "membership_role" ADD CONSTRAINT "FK_cdfc7ee8916103744bdeb898720" FOREIGN KEY ("membershipId") REFERENCES "organisation_membership"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE "organisation_subscription_record" ADD CONSTRAINT "FK_932b1911802c53c16ff79c5d51e" FOREIGN KEY ("organisationId") REFERENCES "organisation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE "user_api_key" ADD CONSTRAINT "FK_c6316cc59f67b45ed31310bce53" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE "organisation_membership" ADD CONSTRAINT "FK_29819ad43b1a415d8df26ff5a03" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE "organisation_membership" ADD CONSTRAINT "FK_3be38f1dacbe189d169072d24c1" FOREIGN KEY ("organisationId") REFERENCES "organisation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "organisation_membership" DROP CONSTRAINT "FK_3be38f1dacbe189d169072d24c1"`
        );
        await queryRunner.query(
            `ALTER TABLE "organisation_membership" DROP CONSTRAINT "FK_29819ad43b1a415d8df26ff5a03"`
        );
        await queryRunner.query(
            `ALTER TABLE "user_api_key" DROP CONSTRAINT "FK_c6316cc59f67b45ed31310bce53"`
        );
        await queryRunner.query(
            `ALTER TABLE "organisation_subscription_record" DROP CONSTRAINT "FK_932b1911802c53c16ff79c5d51e"`
        );
        await queryRunner.query(
            `ALTER TABLE "membership_role" DROP CONSTRAINT "FK_cdfc7ee8916103744bdeb898720"`
        );
        await queryRunner.query(
            `ALTER TABLE "invitation" DROP CONSTRAINT "FK_df447ab611f96137545edd40775"`
        );
        await queryRunner.query(
            `DROP INDEX "public"."IDX_c1ed5dec3dd72686abbc0901f7"`
        );
        await queryRunner.query(`DROP TABLE "organisation_membership"`);
        await queryRunner.query(
            `DROP INDEX "public"."IDX_12ba05413227b872a69d810cfc"`
        );
        await queryRunner.query(
            `DROP INDEX "public"."IDX_a95e949168be7b7ece1a2382fe"`
        );
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(
            `DROP INDEX "public"."IDX_dd5659adb53e896b65e793f713"`
        );
        await queryRunner.query(`DROP TABLE "user_api_key"`);
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
        await queryRunner.query(`DROP TABLE "membership_role"`);
        await queryRunner.query(`DROP TABLE "invitation"`);
        await queryRunner.query(`DROP TABLE "org_github_user"`);
        await queryRunner.query(
            `DROP INDEX "public"."IDX_69281e5c9fd2818a066d09f663"`
        );
        await queryRunner.query(`DROP TABLE "email"`);
        await queryRunner.query(`DROP TABLE "stripe_checkout_event"`);
        await queryRunner.query(`DROP TABLE "subscription_asset"`);
        await queryRunner.query(
            `DROP INDEX "public"."IDX_4907f10417f65fe2284c52eab2"`
        );
        await queryRunner.query(`DROP TABLE "payment_session_reference"`);
    }
}
