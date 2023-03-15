import { MigrationInterface, QueryRunner } from "typeorm";

export class init31678783235776 implements MigrationInterface {
    name = "init31678783235776";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "invitation" ALTER COLUMN "notificationSent" DROP NOT NULL`
        );
        await queryRunner.query(
            `ALTER TABLE "organisation_membership" DROP CONSTRAINT "FK_19d8b2723789ec0384f06cd389f"`
        );
        await queryRunner.query(
            `ALTER TABLE "organisation_membership" ALTER COLUMN "invitationId" SET NOT NULL`
        );
        await queryRunner.query(
            `ALTER TABLE "organisation_membership" ADD CONSTRAINT "FK_19d8b2723789ec0384f06cd389f" FOREIGN KEY ("invitationId") REFERENCES "invitation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "organisation_membership" DROP CONSTRAINT "FK_19d8b2723789ec0384f06cd389f"`
        );
        await queryRunner.query(
            `ALTER TABLE "organisation_membership" ALTER COLUMN "invitationId" DROP NOT NULL`
        );
        await queryRunner.query(
            `ALTER TABLE "organisation_membership" ADD CONSTRAINT "FK_19d8b2723789ec0384f06cd389f" FOREIGN KEY ("invitationId") REFERENCES "invitation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE "invitation" ALTER COLUMN "notificationSent" SET NOT NULL`
        );
    }
}
