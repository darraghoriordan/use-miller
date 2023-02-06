/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
    Organisation,
    OrganisationsApi,
    OrganisationSubscriptionRecord,
    OrganisationSubscriptionsControllerAddSubscriptionRequest,
    Person,
    PersonsApi,
} from "@use-miller/shared-api-client";
import { ApiClientFactory } from "./commonDataModels/ApiClientFactory";

describe("When getting a user the first time", () => {
    const personApi = ApiClientFactory.getAuthenticatedApiInstance(PersonsApi);
    const orgApi =
        ApiClientFactory.getAuthenticatedApiInstance(OrganisationsApi);

    let foundPerson: Person | undefined;

    it("the user is initialised", async () => {
        foundPerson = await personApi.personControllerFindOne({
            uuid: "me",
        });
        expect(foundPerson).toMatchObject({
            auth0UserId: expect.any(String),
            email: "test@test.com",
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

    it("the user's org has no subscriptions", async () => {
        const subscriptions =
            await orgApi.organisationSubscriptionsControllerFindAll({
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                orgUuid: org!.uuid,
            });
        expect(subscriptions).toHaveLength(0);
    });

    let sub: OrganisationSubscriptionRecord | undefined;
    it("we can add a subscription", async () => {
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
        console.log(requestParameters);
        sub = await orgApi.organisationSubscriptionsControllerAddSubscription(
            requestParameters
        );
        expect(sub.uuid).toBeDefined();
    });

    it("we can tidy up", async () => {
        const isDeleted =
            await orgApi.organisationSubscriptionsControllerDeleteSubscription({
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                orgUuid: org!.uuid,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                uuid: sub!.uuid,
            });

        expect(isDeleted).toBe("true");
    });
});
