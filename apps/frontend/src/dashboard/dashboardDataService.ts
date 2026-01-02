import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import { getAuthenticatedApiInstance } from "../api-services/apiInstanceFactories";
import { createMenu } from "./leftMenuGeneration";
import type { components } from "../shared/types/api-specs";
import { auth0 } from "../lib/auth0";

type Organisation = components["schemas"]["Organisation"];
type OrganisationSubscriptionRecord =
    components["schemas"]["OrganisationSubscriptionRecord"];
type SubscriptionAsset = components["schemas"]["SubscriptionAsset"];
type UserDto = components["schemas"]["UserDto"];

export async function dashboardGetSspData(
    context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
) {
    const accessToken = await auth0.getAccessToken(context.req, context.res);
    if (!accessToken?.token) {
        return {
            redirect: {
                destination: "/auth/login",
                permanent: false,
            },
        };
    }

    const orgUuid = context.params?.orgUuid
        ? (context.params?.orgUuid as string)
        : undefined;

    const subAssets = await getCurrentUserSubscriptions(accessToken.token);
    const userData = await getCurrentUser(accessToken.token);
    const mappedProps = mapDataForIndexDashboard(userData, subAssets, orgUuid);

    const orgGhUsers = await getOrgGhUsernames(
        accessToken.token,
        orgUuid || mappedProps.currentOrg.uuid,
    );
    // reduce the first 1 to a single string
    const firstUsername = orgGhUsers[0]?.ghUsername;

    return {
        props: JSON.parse(
            JSON.stringify({ ...mappedProps, ghUsername: firstUsername }),
        ),
    };
}

export const mapDataForIndexDashboard = (
    userData: UserDto,
    subAssets: SubscriptionAsset[],
    currentOrgUuid?: string,
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
        [] as { name: string; uuid: string; id: number }[],
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
            (m) => m.organisation.uuid === currentOrgInstance.uuid,
        )?.organisation?.subscriptionRecords || [];

    return JSON.parse(
        JSON.stringify({
            menuSections,
            subs: subscriptions,
            currentUser: userData,
            subAssets,
            currentOrg: currentOrgInstance,
        }),
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
    const apiClient = getAuthenticatedApiInstance({
        apiBase: process.env.NEXT_PUBLIC_API_BASE_PATH!,
        authToken: accessToken,
        fetchApi: fetch,
    });

    const { data, error } = await apiClient.GET("/user/{uuid}", {
        params: { path: { uuid: "me" } },
    });

    if (error || !data) {
        throw new Error("Failed to fetch user data");
    }

    return data;
};

export const getCurrentUserSubscriptions = async (accessToken: string) => {
    const apiClient = getAuthenticatedApiInstance({
        apiBase: process.env.NEXT_PUBLIC_API_BASE_PATH!,
        authToken: accessToken,
        fetchApi: fetch,
    });

    const { data, error } = await apiClient.GET("/subscription-assets");

    if (error || !data) {
        throw new Error("Failed to fetch subscription assets");
    }

    return data;
};

export const getOrgGhUsernames = async (
    accessToken: string,
    orgUuid: string,
) => {
    const apiClient = getAuthenticatedApiInstance({
        apiBase: process.env.NEXT_PUBLIC_API_BASE_PATH!,
        authToken: accessToken,
        fetchApi: fetch,
    });

    const { data, error } = await apiClient.GET(
        "/onboarding/github-user/{orgUuid}",
        {
            params: { path: { orgUuid } },
        },
    );

    if (error || !data) {
        throw new Error("Failed to fetch github users");
    }

    return data;
};
