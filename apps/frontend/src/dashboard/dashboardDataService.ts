import { getAccessToken } from "@auth0/nextjs-auth0";
import {
    Organisation,
    OrganisationSubscriptionRecord,
    OrganisationSubscriptionsApi,
    SubscriptionAsset,
    UserDto,
    UserOnboardingApi,
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

    const subAssets = await getCurrentUserSubscriptions(
        atResponse.accessToken!
    );
    const userData = await getCurrentUser(atResponse.accessToken!);
    const mappedProps = mapDataForIndexDashboard(userData, subAssets, orgUuid);

    const orgGhUsers = await getOrgGhUsernames(
        atResponse.accessToken!,
        orgUuid || mappedProps.currentOrg.uuid
    );
    // reduce the first 1 to a single string
    const firstUsername = orgGhUsers[0]?.ghUsername;

    return {
        props: JSON.parse(
            JSON.stringify({ ...mappedProps, ghUsername: firstUsername })
        ),
    };
}

export const mapDataForIndexDashboard = (
    userData: UserDto,
    subAssets: SubscriptionAsset[],
    currentOrgUuid?: string
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
    const currentOrgInstance = currentOrgUuid
        ? userOrgs.find((org) => org.uuid === currentOrgUuid)
        : userOrgs[0];
    if (!currentOrgInstance) {
        throw new Error("No organisation for found for this user");
    }

    const menuSections = createMenu(userOrgs);
    const subscriptions =
        userData.memberships.find(
            (m) => m.organisation.uuid === currentOrgInstance.uuid
        )?.organisation?.subscriptionRecords || [];

    return JSON.parse(
        JSON.stringify({
            menuSections,
            subs: subscriptions,
            currentUser: userData,
            subAssets,
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
        subAssets: SubscriptionAsset[];
        currentUser: UserDto;
        currentOrg: Organisation;
    };
};

export const getCurrentUser = async (accessToken: string) => {
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

export const getCurrentUserSubscriptions = async (accessToken: string) => {
    const apiClient = await getAuthenticatedApiInstance(
        OrganisationSubscriptionsApi,
        process.env.NEXT_PUBLIC_API_BASE_PATH,
        accessToken,
        fetch
    );
    const d = await apiClient.subscriptionAssetsControllerGetAssetsForOrg();
    return d;
};

export const getOrgGhUsernames = async (
    accessToken: string,
    orgUuid: string
) => {
    const apiClient = await getAuthenticatedApiInstance(
        UserOnboardingApi,
        process.env.NEXT_PUBLIC_API_BASE_PATH,
        accessToken,
        fetch
    );
    const d = await apiClient.userOnboardingControllerGetAllForOrg({ orgUuid });
    return d;
};
