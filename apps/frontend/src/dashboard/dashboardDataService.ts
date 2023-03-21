import { getAccessToken } from "@auth0/nextjs-auth0";
import {
    Organisation,
    OrganisationSubscriptionRecord,
    UserDto,
    UsersApi,
} from "@use-miller/shared-api-client";
import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import { getAuthenticatedApiInstance } from "../api-services/apiInstanceFactories.js";
import { createMenu } from "./leftMenuGeneration.js";

export async function dashboardGetSspData(
    context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) {
    const atResponse = await getAccessToken(context.req, context.res, {
        scopes: ["openid", "email", "profile", "offline_access"],
    });
    const orgUuid = context.params?.orgUuid
        ? (context.params?.orgUuid as string)
        : undefined;

    const userData = await getUserData(atResponse.accessToken!);
    const data = mapDataForIndexDashboard(
        userData, // user must be logged in
        orgUuid
    );
    return {
        props: data,
    };
}

export const mapDataForIndexDashboard = (
    userData: UserDto,
    currentOrg?: string
) => {
    const userOrgs = userData.memberships.reduce(
        (acc, membership) => [
            ...acc,
            {
                name: membership.organisation.name,
                uuid: membership.organisation.uuid,
                id: membership.organisation.id,
            },
        ],
        [] as { name: string; uuid: string; id: number }[]
    );

    // org data permissions are enforced on the server
    // so we can just return the data
    const currentOrgInstance = currentOrg
        ? userOrgs.find((org) => org.uuid === currentOrg)
        : userOrgs[0];
    if (!currentOrgInstance) {
        throw new Error("No organisation for found for this user");
    }

    const menuSections = createMenu(userOrgs);

    // const oneYearsTime = new Date();
    // oneYearsTime.setFullYear(oneYearsTime.getFullYear() + 1);
    // const fakeSubs = [
    //     {
    //         id: 1,
    //         uuid: "payment-uuid",
    //         productDisplayName: "Miller Web",
    //         paymentSystemTransactionId: "payment-system-transaction-id",
    //         paymentSystemProductId: "payment-system-product-id",
    //         paymentSystemCustomerId: "payment-system-customer-id",
    //         paymentSystemCustomerEmail: "payment-system-customer-email",
    //         paymentSystemMode: "subscription",
    //         paymentSystemName: "stripe",
    //         validUntil: oneYearsTime,
    //         organisationId: 1,
    //         createdDate: new Date(),
    //         updatedDate: new Date(),
    //         deletedDate: undefined,
    //     } as OrganisationSubscriptionRecord,
    // ];
    const subscriptions =
        userData.memberships.find(
            (m) => m.organisation.uuid === currentOrgInstance.uuid
        )?.organisation?.subscriptionRecords || [];

    return JSON.parse(
        JSON.stringify({
            menuSections,
            subs: subscriptions,
            currentUser: userData,
            // subs: fakeSubs,
            currentOrg: currentOrgInstance,
        })
    ) as unknown as {
        menuSections: {
            name: string;
            slug: string;
            items: {
                name: string;
                path: string;
            }[];
        }[];
        subs: OrganisationSubscriptionRecord[];
        // subs: fakeSubs,
        currentUser: UserDto;
        currentOrg: Organisation;
    };
};

export const getUserData = async (accessToken: string) => {
    const apiClient = await getAuthenticatedApiInstance(
        UsersApi,
        process.env.NEXT_PUBLIC_API_BASE_PATH,
        accessToken,
        fetch
    );
    const userData = await apiClient.userControllerFindOne({
        uuid: "me",
    });
    return userData;
};
