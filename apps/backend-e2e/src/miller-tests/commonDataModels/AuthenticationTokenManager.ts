/* eslint-disable @typescript-eslint/no-non-null-assertion */

import LocalApiTestToken from "./LocalApiTestToken";
import fs from "fs";
import axios from "axios";

export enum TestUserAccounts {
    SUPER_USER = "SuperUser",
    BASIC_USER = "BasicUser",
    EMAIL_NOT_VERIFIED_USER = "EmailNotVerifiedUser",
}
export type TestUserConfiguration = {
    tokenPath: string;
    username: string;
    password: string;
    accountType: TestUserAccounts;
    token: string;
};
export class AuthenticationTokenManager {
    static getAccessToken(userType: TestUserAccounts): string {
        return this.userConfiguration.find((x) => x.accountType === userType)!
            .token;
    }

    private static userConfiguration = [
        {
            accountType: TestUserAccounts.SUPER_USER,
            tokenPath: "./tmp-tokens/super-user-local-api-test-token.json",
            username: process.env.AUTH0_TEST_ACCOUNT_USERNAME!,
            password: process.env.AUTH0_TEST_ACCOUNT_PASSWORD!,
            token: "",
        },
        {
            accountType: TestUserAccounts.BASIC_USER,
            tokenPath: "./tmp-tokens/basic-user-api-test-token.json",
            username: process.env.AUTH0_TEST_ACCOUNT_BASIC_USERNAME!,
            password: process.env.AUTH0_TEST_ACCOUNT_BASIC_PASSWORD!,
            token: "",
        },
        {
            accountType: TestUserAccounts.EMAIL_NOT_VERIFIED_USER,
            tokenPath:
                "./tmp-tokens/email-not-verified-user-api-test-token.json",
            username: process.env.AUTH0_TEST_ACCOUNT_NO_EMAILV_USERNAME!,
            password: process.env.AUTH0_TEST_ACCOUNT_NO_EMAILV_PASSWORD!,
            token: "",
        },
    ];

    public static async init(): Promise<void> {
        for (const userConfig of AuthenticationTokenManager.userConfiguration) {
            if (userConfig.token === "") {
                userConfig.token =
                    await AuthenticationTokenManager.initSingleToken(
                        userConfig
                    );
            }
        }
    }

    private static async initSingleToken(
        parameters: TestUserConfiguration
    ): Promise<string> {
        try {
            console.log("Getting new token", parameters);
            if (!parameters.username) {
                throw new Error("No user username provided");
            }

            let localToken: LocalApiTestToken;

            if (!fs.existsSync("./tmp-tokens")) {
                fs.mkdirSync("./tmp-tokens");
            }
            // eslint-disable-next-line prefer-const
            localToken = fs.existsSync(parameters.tokenPath)
                ? new LocalApiTestToken(
                      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                      JSON.parse(
                          fs.readFileSync(parameters.tokenPath).toString()
                      )
                  )
                : new LocalApiTestToken();

            if (localToken.mustRefreshToken()) {
                console.log("Getting new token...");
                const options = {
                    method: "POST",
                    url: `https://${process.env.AUTH0_DOMAIN!}/oauth/token`,

                    headers: {
                        ["content-type"]: "application/x-www-form-urlencoded",
                    },
                    data: new URLSearchParams({
                        // eslint-disable-next-line @typescript-eslint/naming-convention
                        grant_type: "password",
                        username: parameters.username,
                        password: parameters.password,
                        audience: process.env.AUTH0_AUDIENCE!,
                        scope: process.env.AUTH0_SCOPES!,
                        // eslint-disable-next-line @typescript-eslint/naming-convention
                        client_id: process.env.AUTH0_CLIENT_ID!,
                        // eslint-disable-next-line @typescript-eslint/naming-convention
                        client_secret: process.env.AUTH0_CLIENT_SECRET!,
                    }),
                };
                const authPostResponse = await axios.request(options);

                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                if (!authPostResponse.data.access_token) {
                    console.error("No access token returned from auth0", {
                        options,
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        body: authPostResponse.data,
                        status: authPostResponse.status,
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        requestHeaders: authPostResponse.headers,
                    });
                    throw new Error("No access token returned from auth0");
                }
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                localToken.access_token =
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    authPostResponse.data.access_token;
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                localToken.token_type = authPostResponse.data.token_type;
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                localToken.expires_in = authPostResponse.data.expires_in;
                localToken.date_received = new Date();

                fs.writeFileSync(
                    parameters.tokenPath,
                    JSON.stringify(localToken)
                );

                console.log(`New token written to ${parameters.tokenPath}`);
            }

            return localToken.access_token!;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
