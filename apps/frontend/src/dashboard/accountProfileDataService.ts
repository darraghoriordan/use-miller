import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import { getAuthenticatedApiInstance } from "../api-services/apiInstanceFactories";
import { createMenu } from "./leftMenuGeneration";
import {
    getBackendAuthHeaders,
    withPageAuthRequired,
} from "../lib/server-auth";

export const getServerSideProps = withPageAuthRequired(profileGetSspData);

async function profileGetSspData(
    context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
) {
    const authentication = getBackendAuthHeaders(context.req);
    const data = await getAccountIndexData(authentication.cookie);
    return {
        props: data,
    };
}

export const getAccountIndexData = async (cookie?: string) => {
    const userData = await getUserData(cookie);
    const userOrgs = userData.memberships.map((membership) => ({
        name: membership.organisation.name,
        uuid: membership.organisation.uuid,
    }));
    // org data permissions are enforced on the server
    // so we can just return the data
    const menuData = await createMenu(userOrgs);

    return {
        menuSections: menuData,
        currentUser: JSON.parse(JSON.stringify(userData)),
    };
};

export const getUserData = async (cookie?: string) => {
    const apiClient = getAuthenticatedApiInstance({
        apiBase: process.env.NEXT_PUBLIC_API_BASE_PATH!,
        cookie,
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
