import {
    OrganisationSubscriptionsApi,
    PaymentsApi,
    UsersApi,
} from "@use-miller/shared-api-client";
import { getAccessToken } from "@auth0/nextjs-auth0";
import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import { getAuthenticatedApiInstance } from "../../api-services/apiInstanceFactories.js";

const superUserScopes = ["openid", "email", "profile", "offline_access"];
export async function superUserGetUserData(
    context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) {
    const atResponse = await getAccessToken(context.req, context.res, {
        scopes: superUserScopes,
        authorizationParams: {
            audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
        },
    });
    const apiClient = await getAuthenticatedApiInstance(
        UsersApi,
        process.env.NEXT_PUBLIC_API_BASE_PATH!,
        atResponse.accessToken!,
        fetch
    );
    const [allUsers, menuSections] = await Promise.allSettled([
        apiClient.userControllerFindAll(),
        createMenu(),
    ]);
    if (allUsers.status === "rejected" || menuSections.status === "rejected") {
        throw new Error(
            "Failed to get data:" + (allUsers as PromiseRejectedResult).reason!
        );
    }

    return {
        props: JSON.parse(
            JSON.stringify({
                allUsers: allUsers.value,
                menuSections: menuSections.value,
            })
        ),
    };
}

export const createMenu = () => {
    const menuSections = [];

    menuSections.push({
        name: "Super Powers",
        slug: "super-powers",
        items: [
            {
                name: "Users",
                path: "/super-admin/users",
            },
            {
                name: "Org Subs",
                path: "/super-admin/org-subs",
            },
            {
                name: "Payment Events",
                path: "/super-admin/payment-events",
            },
        ],
    });

    return menuSections;
};

export async function superUserGetPaymentData(
    context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) {
    const atResponse = await getAccessToken(context.req, context.res, {
        scopes: superUserScopes,
    });
    const apiClient = await getAuthenticatedApiInstance(
        PaymentsApi,
        process.env.NEXT_PUBLIC_API_BASE_PATH!,
        atResponse.accessToken!,
        fetch
    );

    const [allData, menuSections] = await Promise.allSettled([
        apiClient.stripeEventsControllerGetLastEvents({
            skip: 0,
            take: 20,
        }),
        createMenu(),
    ]);
    if (allData.status === "rejected" || menuSections.status === "rejected") {
        throw new Error("Failed to get data");
    }

    return {
        props: JSON.parse(
            JSON.stringify({
                allData: allData.value,
                menuSections: menuSections.value,
            })
        ),
    };
}

export async function superUserGetSubscriptionsData(
    context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) {
    const atResponse = await getAccessToken(context.req, context.res, {
        scopes: superUserScopes,
    });
    const apiClient = await getAuthenticatedApiInstance(
        OrganisationSubscriptionsApi,
        process.env.NEXT_PUBLIC_API_BASE_PATH!,
        atResponse.accessToken!,
        fetch
    );

    const [orgSubs, menuSections] = await Promise.allSettled([
        apiClient.allSubscriptionsControllerFindAll(),
        createMenu(),
    ]);
    if (orgSubs.status === "rejected" || menuSections.status === "rejected") {
        throw new Error("Failed to get data");
    }

    return {
        props: JSON.parse(
            JSON.stringify({
                allSubs: orgSubs.value,
                menuSections: menuSections.value,
            })
        ),
    };
}
