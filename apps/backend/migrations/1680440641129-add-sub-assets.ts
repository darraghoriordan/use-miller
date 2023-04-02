import { MigrationInterface, QueryRunner } from "typeorm";

export class addSubAssets1680440641129 implements MigrationInterface {
    name = "addSubAssets1680440641129";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "subscription_asset" ("id" SERIAL NOT NULL, "internalSku" character varying NOT NULL, "uri" character varying NOT NULL, "description" character varying NOT NULL, "displayName" character varying NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e4f3169b9426373901f0637d631" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE TABLE "org_github_user" ("id" SERIAL NOT NULL, "orgUuid" character varying NOT NULL, "ghUsername" character varying NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cf49c458ad4a5d034673f08d081" PRIMARY KEY ("id"))`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "org_github_user"`);
        await queryRunner.query(`DROP TABLE "subscription_asset"`);
    }
}
