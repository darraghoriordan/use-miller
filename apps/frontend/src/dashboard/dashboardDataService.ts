import { getAccessToken } from "@auth0/nextjs-auth0";
import {
    OrganisationsApi,
    OrganisationSubscriptionsApi,
    UsersApi,
} from "@use-miller/shared-api-client";
import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import { getAuthenticatedApiInstance } from "../api-services/apiInstanceFactories.js";
import { createMenu } from "./leftMenuGeneration.js";

export const getUserOrgs = async (accessToken: string) => {
    const apiClient = await getAuthenticatedApiInstance(
        OrganisationsApi,
        process.env.NEXT_PUBLIC_API_BASE_PATH,
        accessToken,
        fetch
    );
    const userData = await apiClient.organisationControllerFindAllForUser();
    return userData;
};

export const getSubscriptions = async (accessToken: string, orgId: number) => {
    const apiClient = await getAuthenticatedApiInstance(
        OrganisationSubscriptionsApi,
        process.env.NEXT_PUBLIC_API_BASE_PATH,
        accessToken,
        fetch
    );
    const data = await apiClient.organisationSubscriptionsControllerFindAll({
        orgId,
    });
    return data;
};

export async function dashboardGetSspData(
    context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) {
    const atResponse = await getAccessToken(context.req, context.res, {
        scopes: ["openid", "email", "profile", "offline_access"],
    });
    const orgUuid = context.params?.orgUuid
        ? (context.params?.orgUuid as string)
        : undefined;
    const data = await getIndexDashboardData(
        atResponse.accessToken!, // user can't be logged in
        orgUuid
    );
    return {
        props: data,
    };
}

export const getIndexDashboardData = async (
    accessToken: string,
    currentOrg?: string
) => {
    const userOrgs = await getUserOrgs(accessToken);
    // org data permissions are enforced on the server
    // so we can just return the data
    const currentOrgInstance = currentOrg
        ? userOrgs.find((org) => org.uuid === currentOrg)
        : userOrgs[0];
    if (!currentOrgInstance) {
        throw new Error("No data for found for this user");
    }
    const [subscriptions, menuSections] = await Promise.allSettled([
        getSubscriptions(accessToken, currentOrgInstance.id),
        createMenu(userOrgs),
    ]);
    if (
        subscriptions.status === "rejected" ||
        menuSections.status === "rejected"
    ) {
        throw new Error("Unable to get account data");
    }
    const oneYearsTime = new Date();
    oneYearsTime.setFullYear(oneYearsTime.getFullYear() + 1);
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
    return JSON.parse(
        JSON.stringify({
            menuSections: menuSections.value,
            subs: subscriptions.value,
            // subs: fakeSubs,
            currentOrg: currentOrgInstance,
        })
    );
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

export const getAccountIndexData = async (accessToken: string) => {
    const userOrgs = await getUserOrgs(accessToken);
    // org data permissions are enforced on the server
    // so we can just return the data

    const [userData, menuData] = await Promise.allSettled([
        getUserData(accessToken),
        createMenu(userOrgs),
    ]);
    if (userData.status === "rejected" || menuData.status === "rejected") {
        throw new Error("Unable to get account data");
    }
    return {
        menuSections: menuData.value,
        currentUser: JSON.parse(JSON.stringify(userData.value)),
    };
};
