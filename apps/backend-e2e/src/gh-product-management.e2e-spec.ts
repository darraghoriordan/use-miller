/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
    OrganisationSubscriptionRecord,
    OrganisationSubscriptionsApi,
    OrganisationSubscriptionsControllerAddSubscriptionRequest,
    UserDto,
    UserOnboardingApi,
    UsersApi,
} from "@use-miller/shared-api-client";
import { ApiClientFactory } from "./commonDataModels/ApiClientFactory";
import { TestUserAccounts } from "./commonDataModels/AuthenticationTokenManager";

const ghTestUser = process.env.GH_INVITE_TEST_USER || "miller-test-user";
describe("When a customer has purchased a product", () => {
    const userApi = ApiClientFactory.getAuthenticatedApiInstance(UsersApi);
    const onboardingApi =
        ApiClientFactory.getAuthenticatedApiInstance(UserOnboardingApi);
    const subscriptionsApi = ApiClientFactory.getAuthenticatedApiInstance(
        OrganisationSubscriptionsApi
    );
    const superUserSubscriptionsApi =
        ApiClientFactory.getAuthenticatedApiInstance(
            OrganisationSubscriptionsApi,
            TestUserAccounts.SUPER_USER
        );
    let user: UserDto | undefined;

    it("the user has no subscriptions", async () => {
        user = await userApi.userControllerFindOne({
            uuid: "me",
        });
        expect(user.activeSubscriptionProductKeys.length).toBe(0);
    });

    it("the users org has no github id added", async () => {
        const ghUsers =
            await onboardingApi.userOnboardingControllerGetAllForOrg({
                orgUuid: user?.memberships[0].organisation.uuid!,
            });
        expect(ghUsers.length).toBe(0);
    });

    it("the user can add a github username to their own org", async () => {
        const ghUser = await onboardingApi.userOnboardingControllerAddForOrg({
            orgGithubUserDto: {
                ghUsername: ghTestUser,
                orgUuid: user?.memberships[0].organisation.uuid!,
            },
        });
        expect(ghUser.ghUsername).toBe(ghTestUser);
    });

    let sub: OrganisationSubscriptionRecord[] | undefined;
    it("as super user we can add a subscription", async () => {
        const requestParameters = {
            orgId: user?.memberships[0].organisationId,
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
                orgId: user?.memberships[0].organisationId!,
            });

        const results = [];
        for (const subscription of subscriptions) {
            const isDeleted =
                await superUserSubscriptionsApi.organisationSubscriptionsControllerDeleteSubscription(
                    {
                        orgId: user?.memberships[0].organisationId!,
                        uuid: subscription.uuid,
                    }
                );
            results.push(isDeleted);
        }

        // eslint-disable-next-line @typescript-eslint/naming-convention
        for (const r of results) {
            expect(r.result).toBe(true);
        }
    });

    it("the user can remove the github username from their own org", async () => {
        const ghUser = await onboardingApi.userOnboardingControllerAddForOrg({
            orgGithubUserDto: {
                ghUsername: ghTestUser,
                orgUuid: user?.memberships[0].organisation.uuid!,
            },
        });
        expect(ghUser.ghUsername).toBe(ghTestUser);
    });
});
