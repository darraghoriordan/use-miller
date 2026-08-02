import { MigrationInterface, QueryRunner } from "typeorm";

// eslint-disable-next-line @typescript-eslint/naming-convention
export class StrengthenStripePayments1775000000000 implements MigrationInterface {
    name = "StrengthenStripePayments1775000000000";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE UNIQUE INDEX IF NOT EXISTS "IDX_organisation_subscription_transaction_id" ON "organisation_subscription_record" ("paymentSystemTransactionId")`,
        );
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS "stripe_checkout_attempt" (
                "id" SERIAL NOT NULL,
                "idempotencyKey" character varying(255) NOT NULL,
                "organisationUuid" character varying(64) NOT NULL,
                "userUuid" character varying(64) NOT NULL,
                "productKey" character varying(64) NOT NULL,
                "priceId" character varying(255) NOT NULL,
                "mode" character varying(32) NOT NULL,
                "status" character varying(32) NOT NULL DEFAULT 'creating',
                "stripeSessionId" character varying(255),
                "stripeSessionUrl" text,
                "errorMessage" text,
                "createdDate" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedDate" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_stripe_checkout_attempt" PRIMARY KEY ("id")
            )`,
        );
        await queryRunner.query(
            `CREATE UNIQUE INDEX IF NOT EXISTS "IDX_stripe_checkout_attempt_idempotency" ON "stripe_checkout_attempt" ("idempotencyKey")`,
        );
        await queryRunner.query(
            `CREATE UNIQUE INDEX IF NOT EXISTS "IDX_stripe_checkout_attempt_session" ON "stripe_checkout_attempt" ("stripeSessionId")`,
        );
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS "stripe_payment_event" (
                "id" SERIAL NOT NULL,
                "stripeEventId" character varying(255) NOT NULL,
                "stripeObjectId" character varying(255) NOT NULL,
                "eventType" character varying(128) NOT NULL,
                "clientReferenceId" character varying(255),
                "status" character varying(32) NOT NULL DEFAULT 'received',
                "stripeData" jsonb NOT NULL,
                "errorMessage" text,
                "processingStartedAt" TIMESTAMPTZ,
                "processedAt" TIMESTAMPTZ,
                "processingAttempts" integer NOT NULL DEFAULT 0,
                "createdDate" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedDate" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_stripe_payment_event" PRIMARY KEY ("id")
            )`,
        );
        await queryRunner.query(
            `CREATE UNIQUE INDEX IF NOT EXISTS "IDX_stripe_payment_event_id" ON "stripe_payment_event" ("stripeEventId")`,
        );
        await queryRunner.query(
            `CREATE INDEX IF NOT EXISTS "IDX_stripe_payment_event_object_type" ON "stripe_payment_event" ("stripeObjectId", "eventType")`,
        );
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS "stripe_payment_state" (
                "id" SERIAL NOT NULL,
                "paymentSystemTransactionId" character varying(255) NOT NULL,
                "lastStripeEventId" character varying(255) NOT NULL,
                "lastStripeEventCreatedAt" TIMESTAMPTZ NOT NULL,
                "status" character varying(64) NOT NULL,
                "createdDate" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedDate" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_stripe_payment_state" PRIMARY KEY ("id")
            )`,
        );
        await queryRunner.query(
            `CREATE UNIQUE INDEX IF NOT EXISTS "IDX_stripe_payment_state_transaction" ON "stripe_payment_state" ("paymentSystemTransactionId")`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "stripe_payment_state"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "stripe_payment_event"`);
        await queryRunner.query(
            `DROP TABLE IF EXISTS "stripe_checkout_attempt"`,
        );
        await queryRunner.query(
            `DROP INDEX IF EXISTS "public"."IDX_organisation_subscription_transaction_id"`,
        );
    }
}
