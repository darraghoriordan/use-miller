export enum TestUserAccounts {
    SUPER_USER = "SuperUser",
    BASIC_USER = "BasicUser",
}

interface TestUserConfiguration {
    accountType: TestUserAccounts;
    token: string;
}

export class AuthenticationTokenManager {
    private static readonly userConfiguration: TestUserConfiguration[] = [
        {
            accountType: TestUserAccounts.SUPER_USER,
            token: process.env.BETTER_AUTH_TEST_OWNER_TOKEN ?? "",
        },
        {
            accountType: TestUserAccounts.BASIC_USER,
            token: process.env.BETTER_AUTH_TEST_MEMBER_TOKEN ?? "",
        },
    ];

    static getAccessToken(userType: TestUserAccounts): string {
        const configuration = this.userConfiguration.find(
            (value) => value.accountType === userType,
        );
        if (!configuration?.token) {
            throw new Error(`No Better Auth token configured for ${userType}.`);
        }
        return configuration.token;
    }

    static init(): Promise<void> {
        const missingAccounts = this.userConfiguration
            .filter((configuration) => !configuration.token)
            .map((configuration) => configuration.accountType);
        if (missingAccounts.length > 0) {
            throw new Error(
                `Missing Google-authenticated Better Auth test tokens for: ${missingAccounts.join(", ")}.`,
            );
        }
        return Promise.resolve();
    }
}
