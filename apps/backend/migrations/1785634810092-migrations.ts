import { MigrationInterface, QueryRunner } from "typeorm";

// eslint-disable-next-line @typescript-eslint/naming-convention
export class Migrations1785634810092 implements MigrationInterface {
    name = "Migrations1785634810092";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DROP INDEX "public"."IDX_organisation_subscription_transaction_id"`,
        );
        await queryRunner.query(
            `DROP INDEX "public"."IDX_stripe_payment_state_transaction"`,
        );
        await queryRunner.query(
            `DROP INDEX "public"."IDX_stripe_payment_event_id"`,
        );
        await queryRunner.query(
            `DROP INDEX "public"."IDX_stripe_payment_event_object_type"`,
        );
        await queryRunner.query(
            `DROP INDEX "public"."IDX_stripe_checkout_attempt_idempotency"`,
        );
        await queryRunner.query(
            `DROP INDEX "public"."IDX_stripe_checkout_attempt_session"`,
        );
        await queryRunner.query(
            `CREATE UNIQUE INDEX "IDX_637ab9c8b847ba3cb5fd250641" ON "organisation_subscription_record" ("paymentSystemTransactionId") `,
        );
        await queryRunner.query(
            `CREATE UNIQUE INDEX "IDX_abf50d0366f311c5216a457dfd" ON "stripe_payment_state" ("paymentSystemTransactionId") `,
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_5b4a6cba1aa8faff4e1e0e87f9" ON "stripe_payment_event" ("status", "processingStartedAt") `,
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_2c2d3cfd77bd70438655006537" ON "stripe_payment_event" ("stripeObjectId", "eventType") `,
        );
        await queryRunner.query(
            `CREATE UNIQUE INDEX "IDX_4dfba4f08604515daa079317e6" ON "stripe_payment_event" ("stripeEventId") `,
        );
        await queryRunner.query(
            `CREATE UNIQUE INDEX "IDX_456fbbc7b3d0e5899b3700a85c" ON "stripe_checkout_attempt" ("stripeSessionId") `,
        );
        await queryRunner.query(
            `CREATE UNIQUE INDEX "IDX_09494196f4c8150727e828cc4f" ON "stripe_checkout_attempt" ("idempotencyKey") `,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DROP INDEX "public"."IDX_09494196f4c8150727e828cc4f"`,
        );
        await queryRunner.query(
            `DROP INDEX "public"."IDX_456fbbc7b3d0e5899b3700a85c"`,
        );
        await queryRunner.query(
            `DROP INDEX "public"."IDX_4dfba4f08604515daa079317e6"`,
        );
        await queryRunner.query(
            `DROP INDEX "public"."IDX_2c2d3cfd77bd70438655006537"`,
        );
        await queryRunner.query(
            `DROP INDEX "public"."IDX_5b4a6cba1aa8faff4e1e0e87f9"`,
        );
        await queryRunner.query(
            `DROP INDEX "public"."IDX_abf50d0366f311c5216a457dfd"`,
        );
        await queryRunner.query(
            `DROP INDEX "public"."IDX_637ab9c8b847ba3cb5fd250641"`,
        );
        await queryRunner.query(
            `CREATE UNIQUE INDEX "IDX_stripe_checkout_attempt_session" ON "stripe_checkout_attempt" ("stripeSessionId") `,
        );
        await queryRunner.query(
            `CREATE UNIQUE INDEX "IDX_stripe_checkout_attempt_idempotency" ON "stripe_checkout_attempt" ("idempotencyKey") `,
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_stripe_payment_event_object_type" ON "stripe_payment_event" ("stripeObjectId", "eventType") `,
        );
        await queryRunner.query(
            `CREATE UNIQUE INDEX "IDX_stripe_payment_event_id" ON "stripe_payment_event" ("stripeEventId") `,
        );
        await queryRunner.query(
            `CREATE UNIQUE INDEX "IDX_stripe_payment_state_transaction" ON "stripe_payment_state" ("paymentSystemTransactionId") `,
        );
        await queryRunner.query(
            `CREATE UNIQUE INDEX "IDX_organisation_subscription_transaction_id" ON "organisation_subscription_record" ("paymentSystemTransactionId") `,
        );
    }
}
