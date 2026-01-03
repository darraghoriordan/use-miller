/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import type { components } from "./shared/types/api-specs";
import {
    getAuthenticatedApiInstance,
    throwIfError,
    type ApiClient,
} from "./commonDataModels/ApiClientFactory";
import { TestUserAccounts } from "./commonDataModels/AuthenticationTokenManager";

type UserDto = components["schemas"]["UserDto"];
type OrganisationSubscriptionRecord =
    components["schemas"]["OrganisationSubscriptionRecord"];

const ghTestUser = process.env.GH_INVITE_TEST_USER || "miller-test-user";
describe("When a customer has purchased a product", () => {
    const api: ApiClient = getAuthenticatedApiInstance();
    const superUserApi: ApiClient = getAuthenticatedApiInstance(
        TestUserAccounts.SUPER_USER,
    );
    let user: UserDto | undefined;

    it("the user has no subscriptions", async () => {
        const { data, error } = await api.GET("/user/{uuid}", {
            params: { path: { uuid: "me" } },
        });
        throwIfError(error);
        user = data;
        expect(user.activeSubscriptionProductKeys.length).toBe(0);
    });

    it("the users org has no github id added", async () => {
        const { data: ghUsers, error } = await api.GET(
            "/onboarding/github-user/{orgUuid}",
            {
                params: {
                    path: { orgUuid: user?.memberships[0].organisation.uuid! },
                },
            },
        );
        throwIfError(error);
        expect(ghUsers.length).toBe(0);
    });

    it("the user can add a github username to their own org", async () => {
        const { data: ghUser, error } = await api.POST(
            "/onboarding/github-user",
            {
                body: {
                    ghUsername: ghTestUser,
                    orgUuid: user?.memberships[0].organisation.uuid!,
                },
            },
        );
        throwIfError(error);
        expect(ghUser.ghUsername).toBe(ghTestUser);
    });

    let sub: OrganisationSubscriptionRecord[] | undefined;
    it("as super user we can add a subscription", async () => {
        const { data, error } = await superUserApi.POST(
            "/organisation/{orgUuid}/subscriptions",
            {
                params: {
                    path: { orgUuid: user?.memberships[0].organisation.uuid! },
                },
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
                params: {
                    path: { orgUuid: user?.memberships[0].organisation.uuid! },
                },
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
                                orgUuid:
                                    user?.memberships[0].organisation.uuid!,
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

    // Note: This test requires the API spec to be regenerated after adding DELETE endpoint
    // The endpoint is: DELETE /onboarding/github-user/{orgUuid}/{ghUserId}
    it.skip("the user can remove the github username from their own org", async () => {
        // First get the github users to find the one to delete
        const { data: ghUsers, error: findError } = await api.GET(
            "/onboarding/github-user/{orgUuid}",
            {
                params: {
                    path: { orgUuid: user?.memberships[0].organisation.uuid! },
                },
            },
        );
        throwIfError(findError);
        expect(ghUsers.length).toBeGreaterThan(0);

        const ghUserToDelete = ghUsers[0];
        console.log("Would delete ghUser:", ghUserToDelete.id);
        // Uncomment after API spec regeneration:
        // const { data: deleteResult, error } = await api.DELETE(
        //     "/onboarding/github-user/{orgUuid}/{ghUserId}",
        //     {
        //         params: {
        //             path: {
        //                 orgUuid: user?.memberships[0].organisation.uuid!,
        //                 ghUserId: ghUserToDelete.id,
        //             },
        //         },
        //     },
        // );
        // throwIfError(error);
        // expect(deleteResult.result).toBe(true);

        // Verify the user was removed
        // const { data: ghUsersAfter } = await api.GET(
        //     "/onboarding/github-user/{orgUuid}",
        //     {
        //         params: {
        //             path: { orgUuid: user?.memberships[0].organisation.uuid! },
        //         },
        //     },
        // );
        // expect(ghUsersAfter.length).toBe(0);
    });
});
