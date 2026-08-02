import { createAuthDatabaseUrl } from "./auth-database-url.js";

describe("createAuthDatabaseUrl", () => {
    it("uses the Dokku database service URL", () => {
        expect(
            createAuthDatabaseUrl({
                ["DATABASE_URL"]: "postgres://dokku-service/database",
            }),
        ).toBe("postgres://dokku-service/database");
    });

    it("prefers an explicit Better Auth database URL", () => {
        expect(
            createAuthDatabaseUrl({
                ["BETTER_AUTH_DATABASE_URL"]: "postgres://auth/database",
                ["DATABASE_URL"]: "postgres://dokku-service/database",
            }),
        ).toBe("postgres://auth/database");
    });

    it("builds the local URL and escapes credentials", () => {
        expect(
            createAuthDatabaseUrl({
                ["APP_POSTGRES_USER"]: "miller user",
                ["APP_POSTGRES_PASSWORD"]: "secret/password",
                ["APP_POSTGRES_HOST"]: "localhost",
                ["APP_POSTGRES_PORT"]: "5438",
                ["APP_POSTGRES_DATABASE"]: "miller database",
            }),
        ).toBe(
            "postgres://miller%20user:secret%2Fpassword@localhost:5438/miller%20database",
        );
    });
});
