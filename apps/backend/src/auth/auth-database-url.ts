function requiredEnvironment(
    environment: NodeJS.ProcessEnv,
    key: string,
): string {
    const value = environment[key];
    if (!value) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
    return value;
}

export function createAuthDatabaseUrl(
    environment: NodeJS.ProcessEnv = process.env,
): string {
    const configuredUrl =
        environment.BETTER_AUTH_DATABASE_URL ?? environment.DATABASE_URL;
    if (configuredUrl) {
        return configuredUrl;
    }

    const user = encodeURIComponent(
        requiredEnvironment(environment, "APP_POSTGRES_USER"),
    );
    const password = encodeURIComponent(
        requiredEnvironment(environment, "APP_POSTGRES_PASSWORD"),
    );
    const host = requiredEnvironment(environment, "APP_POSTGRES_HOST");
    const port = requiredEnvironment(environment, "APP_POSTGRES_PORT");
    const database = encodeURIComponent(
        requiredEnvironment(environment, "APP_POSTGRES_DATABASE"),
    );
    return `postgres://${user}:${password}@${host}:${port}/${database}`;
}
