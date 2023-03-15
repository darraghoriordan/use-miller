import { MigrationInterface, QueryRunner } from "typeorm";

export class init71678843093027 implements MigrationInterface {
    name = "init71678843093027";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "organisation_membership" DROP CONSTRAINT "FK_19d8b2723789ec0384f06cd389f"`
        );
        await queryRunner.query(
            `ALTER TABLE "organisation_membership" DROP CONSTRAINT "REL_19d8b2723789ec0384f06cd389"`
        );
        await queryRunner.query(
            `ALTER TABLE "organisation_membership" DROP COLUMN "invitationId"`
        );
        await queryRunner.query(
            `ALTER TABLE "invitation" ADD "organisationMembershipId" integer`
        );
        await queryRunner.query(
            `ALTER TABLE "invitation" ADD CONSTRAINT "FK_df447ab611f96137545edd40775" FOREIGN KEY ("organisationMembershipId") REFERENCES "organisation_membership"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "invitation" DROP CONSTRAINT "FK_df447ab611f96137545edd40775"`
        );
        await queryRunner.query(
            `ALTER TABLE "invitation" DROP COLUMN "organisationMembershipId"`
        );
        await queryRunner.query(
            `ALTER TABLE "organisation_membership" ADD "invitationId" integer`
        );
        await queryRunner.query(
            `ALTER TABLE "organisation_membership" ADD CONSTRAINT "REL_19d8b2723789ec0384f06cd389" UNIQUE ("invitationId")`
        );
        await queryRunner.query(
            `ALTER TABLE "organisation_membership" ADD CONSTRAINT "FK_19d8b2723789ec0384f06cd389f" FOREIGN KEY ("invitationId") REFERENCES "invitation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
    }
}
