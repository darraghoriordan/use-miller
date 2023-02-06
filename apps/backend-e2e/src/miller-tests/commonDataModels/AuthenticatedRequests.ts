/* eslint-disable @typescript-eslint/no-non-null-assertion */

import LocalApiTestToken from "./LocalApiTestToken";
import fs from "fs";
import axios from "axios";

export class AuthenticatedRequests {
    static contentType = "content-type";
    static jsonType = "application/json";
    static validToken = "";

    public static tokenPath = "./local-api-test-token.json";

    public static async setToken(): Promise<void> {
        const shouldRunAuthentication =
            AuthenticatedRequests.validToken === undefined ||
            AuthenticatedRequests.validToken === "";

        if (shouldRunAuthentication) {
            try {
                let localToken: LocalApiTestToken;

                // eslint-disable-next-line prefer-const
                localToken = fs.existsSync(this.tokenPath)
                    ? new LocalApiTestToken(
                          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                          JSON.parse(fs.readFileSync(this.tokenPath).toString())
                      )
                    : new LocalApiTestToken();

                if (localToken.needNewToken()) {
                    console.log("Getting new token...");
                    const options = {
                        method: "POST",
                        url: `https://${process.env.AUTH0_DOMAIN!}/oauth/token`,

                        headers: {
                            ["content-type"]:
                                "application/x-www-form-urlencoded",
                        },
                        data: new URLSearchParams({
                            // eslint-disable-next-line @typescript-eslint/naming-convention
                            grant_type: "password",
                            username: process.env.AUTH0_TEST_ACCOUNT_USERNAME!,
                            password: process.env.AUTH0_TEST_ACCOUNT_PASSWORD!,
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
                        this.tokenPath,
                        JSON.stringify(localToken)
                    );

                    console.log(
                        "New token written to ./local-api-test-token.json"
                    );
                }

                AuthenticatedRequests.validToken = localToken.access_token!;
            } catch (error) {
                console.error(error);
                throw error;
            }
        }
    }
}
