import { MigrationInterface, QueryRunner } from "typeorm";

// eslint-disable-next-line @typescript-eslint/naming-convention
export class BetterAuthAdmin1785670000000 implements MigrationInterface {
    name = "BetterAuthAdmin1785670000000";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "ba_user" ADD "role" text DEFAULT 'user'`,
        );
        await queryRunner.query(
            `ALTER TABLE "ba_user" ADD "banned" boolean DEFAULT false`,
        );
        await queryRunner.query(`ALTER TABLE "ba_user" ADD "banReason" text`);
        await queryRunner.query(
            `ALTER TABLE "ba_user" ADD "banExpires" TIMESTAMPTZ`,
        );
        await queryRunner.query(
            `ALTER TABLE "ba_session" ADD "impersonatedBy" text`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "ba_session" DROP COLUMN "impersonatedBy"`,
        );
        await queryRunner.query(
            `ALTER TABLE "ba_user" DROP COLUMN "banExpires"`,
        );
        await queryRunner.query(
            `ALTER TABLE "ba_user" DROP COLUMN "banReason"`,
        );
        await queryRunner.query(`ALTER TABLE "ba_user" DROP COLUMN "banned"`);
        await queryRunner.query(`ALTER TABLE "ba_user" DROP COLUMN "role"`);
    }
}
