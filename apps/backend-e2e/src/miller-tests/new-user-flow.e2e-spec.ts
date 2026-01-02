/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { components } from "../shared/types/api-specs";
import {
    getAuthenticatedApiInstance,
    throwIfError,
    type ApiClient,
} from "../commonDataModels/ApiClientFactory";
import { TestUserAccounts } from "../commonDataModels/AuthenticationTokenManager";

type Organisation = components["schemas"]["Organisation"];
type OrganisationSubscriptionRecord =
    components["schemas"]["OrganisationSubscriptionRecord"];

// This follows a user through the first steps when they hit
// the api for the first time.

describe("When getting a user the first time", () => {
    const api: ApiClient = getAuthenticatedApiInstance();
    const superUserApi: ApiClient = getAuthenticatedApiInstance(
        TestUserAccounts.SUPER_USER,
    );

    it("the user is initialised", async () => {
        const { data: foundUser, error } = await api.GET("/user/{uuid}", {
            params: { path: { uuid: "me" } },
        });
        throwIfError(error);
        expect(foundUser).toMatchObject({
            //   auth0UserId: expect.any(String),
            email: "testbasic@testbasic.com",
        });
    }, 30_000);

    it("any path other than 'me' is treated as an id", async () => {
        const { response } = await api.GET("/user/{uuid}", {
            params: { path: { uuid: "does_not_exist" } },
        });
        expect(response.status).toBe(400);
        expect(response.statusText).toBe("Bad Request");
    });

    let org: Organisation | undefined;
    it("the user has an organisation", async () => {
        const { data: orgs, error } = await api.GET("/organisation");
        throwIfError(error);
        expect(orgs).toHaveLength(1);

        org = orgs[0];
    });

    it("the user's org has one membership for the user", async () => {
        const { data: memberships, error } = await api.GET(
            "/organisation/{orgUuid}/memberships",
            {
                params: { path: { orgUuid: org!.uuid } },
            },
        );
        throwIfError(error);
        expect(memberships).toHaveLength(1);

        expect(memberships[0]).toMatchObject({
            roles: [
                {
                    name: "owner",
                },
            ],
        });
    });

    it("the user's org has no subscriptions", async () => {
        const { data: subscriptions, error } = await api.GET(
            "/organisation/{orgUuid}/subscriptions",
            {
                params: { path: { orgUuid: org!.uuid } },
            },
        );
        throwIfError(error);
        expect(subscriptions).toHaveLength(0);
    });

    let sub: OrganisationSubscriptionRecord[] | undefined;
    it("as super user we can add a subscription", async () => {
        const { data, error } = await superUserApi.POST(
            "/organisation/{orgUuid}/subscriptions",
            {
                params: { path: { orgUuid: org!.uuid } },
                body: {
                    // 1 year from now
                    validUntil: new Date(
                        new Date().setFullYear(new Date().getFullYear() + 1),
                    ).toISOString(),
                    paymentSystemName: "stripe",
                    paymentSystemMode: "payment",
                    internalSku: "miller-start",
                    paymentSystemCustomerId: "cus_123",
                    // millerPaymentReferenceUuid: "123", no payment reference when creating manually
                    paymentSystemProductId: "prod_123",
                    paymentSystemCustomerEmail: "test@test.com",
                    paymentSystemTransactionId: "txn_123",
                    productDisplayName: "Test Product",
                },
            },
        );
        throwIfError(error);
        sub = data;
        expect(sub[0].uuid).toBeDefined();
    });

    it("as a super user we can remove any subscription", async () => {
        const { data: subscriptions, error: findError } = await api.GET(
            "/organisation/{orgUuid}/subscriptions",
            {
                params: { path: { orgUuid: org!.uuid } },
            },
        );
        throwIfError(findError);

        const results = [];
        for (const subscription of subscriptions) {
            const { data: isDeleted, error: deleteError } =
                await superUserApi.DELETE(
                    "/organisation/{orgUuid}/subscriptions/{uuid}",
                    {
                        params: {
                            path: {
                                orgUuid: org!.uuid,
                                uuid: subscription.uuid,
                            },
                        },
                    },
                );
            throwIfError(deleteError);
            results.push(isDeleted);
        }

        for (const r of results) {
            expect(r.result).toBe(true);
        }
    });
});
