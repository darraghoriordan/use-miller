 
 
import {
    Organisation,
    OrganisationMembershipsApi,
    OrganisationsApi,
    OrganisationSubscriptionRecord,
    OrganisationSubscriptionsApi,
    OrganisationSubscriptionsControllerAddSubscriptionRequest,
    UsersApi,
} from "@use-miller/shared-api-client";
import { ApiClientFactory } from "../commonDataModels/ApiClientFactory";
import { TestUserAccounts } from "../commonDataModels/AuthenticationTokenManager";

// This follows a user through the first steps when they hit
// the api for the first time.

describe("When getting a user the first time", () => {
    const userApi = ApiClientFactory.getAuthenticatedApiInstance(UsersApi);
    const orgApi =
        ApiClientFactory.getAuthenticatedApiInstance(OrganisationsApi);
    const orgMembershipsApi = ApiClientFactory.getAuthenticatedApiInstance(
        OrganisationMembershipsApi
    );
    const subscriptionsApi = ApiClientFactory.getAuthenticatedApiInstance(
        OrganisationSubscriptionsApi
    );
    const superUserSubscriptionsApi =
        ApiClientFactory.getAuthenticatedApiInstance(
            OrganisationSubscriptionsApi,
            TestUserAccounts.SUPER_USER
        );

    it("the user is initialised", async () => {
        const foundUser = await userApi.userControllerFindOne({
            uuid: "me",
        });
        expect(foundUser).toMatchObject({
            //   auth0UserId: expect.any(String),
            email: "testbasic@testbasic.com",
        });
    }, 30_000);

    it("any path other than 'me' is treated as an id", async () => {
        await expect(() =>
            userApi.userControllerFindOne({
                uuid: "does_not_exist",
            })
        ).rejects.toMatchObject({ statusText: "Bad Request" });
    });

    let org: Organisation | undefined;
    it("the user has an organisation", async () => {
        const orgs = await orgApi.organisationControllerFindAllForUser();
        expect(orgs).toHaveLength(1);

        org = orgs[0];
    });

    it("the user's org has one membership for the user", async () => {
        const memberships =
            await orgMembershipsApi.organisationMembershipsControllerFindAll({
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                orgUuid: org!.uuid,
            });
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
        const subscriptions =
            await subscriptionsApi.organisationSubscriptionsControllerFindAll({
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                orgId: org!.id,
            });
        expect(subscriptions).toHaveLength(0);
    });

    let sub: OrganisationSubscriptionRecord[] | undefined;
    it("as super user we can add a subscription", async () => {
        const requestParameters = {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            orgId: org!.id,
            saveOrganisationSubscriptionRecordDto: {
                // 1 year from now
                validUntil: new Date(
                    new Date().setFullYear(new Date().getFullYear() + 1)
                ),
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
        } as OrganisationSubscriptionsControllerAddSubscriptionRequest;

        sub =
            await superUserSubscriptionsApi.organisationSubscriptionsControllerAddSubscription(
                requestParameters
            );
        expect(sub[0].uuid).toBeDefined();
    });

    it("as a super user we can remove any subscription", async () => {
        const subscriptions =
            await subscriptionsApi.organisationSubscriptionsControllerFindAll({
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                orgId: org!.id,
            });

        const results = [];
        for (const subscription of subscriptions) {
            const isDeleted =
                await superUserSubscriptionsApi.organisationSubscriptionsControllerDeleteSubscription(
                    {
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        orgId: org!.id,
                         
                        uuid: subscription.uuid,
                    }
                );
            results.push(isDeleted);
        }

         
        for (const r of results) {
            expect(r.result).toBe(true);
        }
    });
});
