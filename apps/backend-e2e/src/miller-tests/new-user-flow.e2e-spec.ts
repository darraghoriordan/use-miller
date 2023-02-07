/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
    Organisation,
    OrganisationMembershipsApi,
    OrganisationsApi,
    OrganisationSubscriptionRecord,
    OrganisationSubscriptionsApi,
    OrganisationSubscriptionsControllerAddSubscriptionRequest,
    Person,
    PersonsApi,
} from "@use-miller/shared-api-client";
import { ApiClientFactory } from "./commonDataModels/ApiClientFactory";

// This follows a user through the first steps when they hit
// the api for the first time.
describe("When getting a user the first time", () => {
    const personApi = ApiClientFactory.getAuthenticatedApiInstance(PersonsApi);
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
            true
        );

    let foundPerson: Person | undefined;

    it("the user is initialised", async () => {
        foundPerson = await personApi.personControllerFindOne({
            uuid: "me",
        });
        expect(foundPerson).toMatchObject({
            auth0UserId: expect.any(String),
            email: "testbasic@testbasic.com",
        });
    });

    it("any path other than 'me' is treated as an id", async () => {
        await expect(() =>
            personApi.personControllerFindOne({
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
        console.log("memberships", memberships);
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
                orgUuid: org!.uuid,
            });
        expect(subscriptions).toHaveLength(0);
    });

    let sub: OrganisationSubscriptionRecord | undefined;
    it("as super user we can add a subscription", async () => {
        const requestParameters = {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            orgUuid: org!.uuid,
            saveOrganisationSubscriptionRecordDto: {
                // 1 year from now
                validUntil: new Date(
                    new Date().setFullYear(new Date().getFullYear() + 1)
                ),
                stripeSubscriptionId: "sub_123",
                stripeCustomerId: "cus_123",
                stripePriceId: "price_123",
            },
        } as OrganisationSubscriptionsControllerAddSubscriptionRequest;

        sub =
            await superUserSubscriptionsApi.organisationSubscriptionsControllerAddSubscription(
                requestParameters
            );
        expect(sub.uuid).toBeDefined();
    });

    it("as a super user we can tidy up", async () => {
        const subscriptions =
            await subscriptionsApi.organisationSubscriptionsControllerFindAll({
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                orgUuid: org!.uuid,
            });

        const results = [];
        for (const subscription of subscriptions) {
            const isDeleted =
                await superUserSubscriptionsApi.organisationSubscriptionsControllerDeleteSubscription(
                    {
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        orgUuid: org!.uuid,
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        uuid: subscription.uuid,
                    }
                );
            results.push(isDeleted);
        }

        // eslint-disable-next-line @typescript-eslint/naming-convention
        for (const r of results) {
            expect(r).toBe("true");
        }
    });
});
