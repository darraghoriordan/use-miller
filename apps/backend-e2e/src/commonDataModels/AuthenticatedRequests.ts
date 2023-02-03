/* eslint-disable @typescript-eslint/no-non-null-assertion */
import request from "supertest";
import LocalApiTestToken from "./LocalApiTestToken";
import fs from "fs";
export class AuthenticatedRequests {
    static contentType = "content-type";
    static jsonType = "application/json";
    static validToken = "";

    public static getRequestAuthenticated(path: string): request.Test {
        return request(process.env.TEST_API_URL)
            .get(path)
            .auth(AuthenticatedRequests.validToken, { type: "bearer" })
            .set(
                AuthenticatedRequests.contentType,
                AuthenticatedRequests.jsonType
            );
    }

    public static postRequestAuthenticated(path: string): request.Test {
        return request(process.env.TEST_API_URL)
            .post(path)
            .auth(AuthenticatedRequests.validToken, { type: "bearer" })
            .set(
                AuthenticatedRequests.contentType,
                AuthenticatedRequests.jsonType
            );
    }

    public static deleteRequestAuthenticated(path: string): request.Test {
        return request(process.env.TEST_API_URL)
            .delete(path)
            .auth(AuthenticatedRequests.validToken, { type: "bearer" })
            .set(
                AuthenticatedRequests.contentType,
                AuthenticatedRequests.jsonType
            );
    }
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
                    const requestParameters = new URLSearchParams({
                        /* eslint-disable @typescript-eslint/naming-convention */
                        grant_type: "password",
                        username: process.env.AUTH0_USERNAME!,
                        password: process.env.AUTH0_PASSWORD!,
                        audience: process.env.AUTH0_AUDIENCE!,
                        scope: process.env.AUTH0_SCOPES!,
                        client_id: process.env.AUTH0_CLIENT_ID!,
                        client_secret: process.env.AUTH0_CLIENT_SECRET!,

                        /* eslint-enable @typescript-eslint/naming-convention */
                    });
                    const authPostResponse = await request(
                        `https://${process.env.AUTH0_DOMAIN!}`
                    )
                        .post("/oauth/token")
                        .set(
                            "content-type",
                            "application/x-www-form-urlencoded"
                        )
                        .send(requestParameters.toString());
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    if (!authPostResponse.body.access_token) {
                        console.log("No access token returned from auth0", {
                            requestParams: requestParameters.toString(),
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                            body: authPostResponse.body,
                            status: authPostResponse.status,
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                            requestHeaders: authPostResponse.headers,
                        });
                        throw new Error("No access token returned from auth0");
                    }
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    localToken.access_token =
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                        authPostResponse.body.access_token;
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                    localToken.token_type = authPostResponse.body.token_type;
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                    localToken.expires_in = authPostResponse.body.expires_in;
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
            }
        }
    }
}
