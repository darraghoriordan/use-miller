import axios, { AxiosError } from "axios";

export enum TestUserAccounts {
    SUPER_USER = "SuperUser",
    BASIC_USER = "BasicUser",
    EMAIL_NOT_VERIFIED_USER = "EmailNotVerifiedUser",
}

export interface TestUserConfiguration {
    username: string;
    password: string;
    accountType: TestUserAccounts;
    token: string;
}

export class AuthenticationTokenManager {
    private static readonly userConfiguration: TestUserConfiguration[] = [
        {
            accountType: TestUserAccounts.SUPER_USER,
            username: process.env.BETTER_AUTH_TEST_ACCOUNT_USERNAME ?? "",
            password: process.env.BETTER_AUTH_TEST_ACCOUNT_PASSWORD ?? "",
            token: "",
        },
        {
            accountType: TestUserAccounts.BASIC_USER,
            username: process.env.BETTER_AUTH_TEST_ACCOUNT_BASIC_USERNAME ?? "",
            password: process.env.BETTER_AUTH_TEST_ACCOUNT_BASIC_PASSWORD ?? "",
            token: "",
        },
        {
            accountType: TestUserAccounts.EMAIL_NOT_VERIFIED_USER,
            username:
                process.env.BETTER_AUTH_TEST_ACCOUNT_NO_EMAILV_USERNAME ?? "",
            password:
                process.env.BETTER_AUTH_TEST_ACCOUNT_NO_EMAILV_PASSWORD ?? "",
            token: "",
        },
    ];

    static getAccessToken(userType: TestUserAccounts): string {
        const configuration = this.userConfiguration.find(
            (value) => value.accountType === userType,
        );
        if (!configuration?.token) {
            throw new Error(
                `No Better Auth token initialized for ${userType}.`,
            );
        }
        return configuration.token;
    }

    static async init(): Promise<void> {
        for (const userConfig of this.userConfiguration) {
            userConfig.token = await this.initSingleToken(userConfig);
        }
    }

    private static async initSingleToken(
        configuration: TestUserConfiguration,
    ): Promise<string> {
        if (!configuration.username || !configuration.password) {
            throw new Error(
                `Missing Better Auth test credentials for ${configuration.accountType}. Run mill setup --only auth --apply --yes.`,
            );
        }

        const baseUrl = process.env.TEST_API_URL ?? "http://localhost:34522";
        try {
            await axios.post(`${baseUrl}/api/auth/sign-up/email`, {
                email: configuration.username,
                password: configuration.password,
                name: configuration.accountType,
            });
        } catch (error) {
            const status = (error as AxiosError).response?.status;
            if (status !== 400 && status !== 409 && status !== 422) {
                throw error;
            }
        }

        const response = await axios.post(`${baseUrl}/api/auth/sign-in/email`, {
            email: configuration.username,
            password: configuration.password,
        });
        const token = response.headers["set-auth-token"] as string | undefined;
        if (!token) {
            throw new Error(
                `Better Auth did not return a bearer token for ${configuration.accountType}.`,
            );
        }
        return token;
    }
}
