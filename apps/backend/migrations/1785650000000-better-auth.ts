import { MigrationInterface, QueryRunner } from "typeorm";

// eslint-disable-next-line @typescript-eslint/naming-convention
export class BetterAuth1785650000000 implements MigrationInterface {
    name = "BetterAuth1785650000000";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "user" ADD "authProviderUserId" character varying`,
        );
        await queryRunner.query(
            `CREATE UNIQUE INDEX "IDX_user_auth_provider_user_id" ON "user" ("authProviderUserId")`,
        );
        await queryRunner.query(
            `CREATE TABLE "ba_user" ("id" uuid DEFAULT gen_random_uuid() NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "emailVerified" boolean NOT NULL, "image" text, "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(), "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now(), CONSTRAINT "UQ_ba_user_email" UNIQUE ("email"), CONSTRAINT "PK_ba_user" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "ba_session" ("id" uuid DEFAULT gen_random_uuid() NOT NULL, "expiresAt" TIMESTAMPTZ NOT NULL, "token" text NOT NULL, "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(), "updatedAt" TIMESTAMPTZ NOT NULL, "ipAddress" text, "userAgent" text, "userId" uuid NOT NULL, CONSTRAINT "UQ_ba_session_token" UNIQUE ("token"), CONSTRAINT "PK_ba_session" PRIMARY KEY ("id"), CONSTRAINT "FK_ba_session_user" FOREIGN KEY ("userId") REFERENCES "ba_user"("id") ON DELETE CASCADE)`,
        );
        await queryRunner.query(
            `CREATE INDEX "ba_session_userId_idx" ON "ba_session" ("userId")`,
        );
        await queryRunner.query(
            `CREATE TABLE "ba_account" ("id" uuid DEFAULT gen_random_uuid() NOT NULL, "accountId" text NOT NULL, "providerId" text NOT NULL, "userId" uuid NOT NULL, "accessToken" text, "refreshToken" text, "idToken" text, "accessTokenExpiresAt" TIMESTAMPTZ, "refreshTokenExpiresAt" TIMESTAMPTZ, "scope" text, "password" text, "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(), "updatedAt" TIMESTAMPTZ NOT NULL, CONSTRAINT "PK_ba_account" PRIMARY KEY ("id"), CONSTRAINT "FK_ba_account_user" FOREIGN KEY ("userId") REFERENCES "ba_user"("id") ON DELETE CASCADE)`,
        );
        await queryRunner.query(
            `CREATE INDEX "ba_account_userId_idx" ON "ba_account" ("userId")`,
        );
        await queryRunner.query(
            `CREATE TABLE "ba_verification" ("id" uuid DEFAULT gen_random_uuid() NOT NULL, "identifier" text NOT NULL, "value" text NOT NULL, "expiresAt" TIMESTAMPTZ NOT NULL, "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(), "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now(), CONSTRAINT "PK_ba_verification" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE INDEX "ba_verification_identifier_idx" ON "ba_verification" ("identifier")`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "ba_verification"`);
        await queryRunner.query(`DROP TABLE "ba_account"`);
        await queryRunner.query(`DROP TABLE "ba_session"`);
        await queryRunner.query(`DROP TABLE "ba_user"`);
        await queryRunner.query(
            `DROP INDEX "public"."IDX_user_auth_provider_user_id"`,
        );
        await queryRunner.query(
            `ALTER TABLE "user" DROP COLUMN "authProviderUserId"`,
        );
    }
}
