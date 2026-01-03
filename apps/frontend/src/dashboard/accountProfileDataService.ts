import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import { getAuthenticatedApiInstance } from "../api-services/apiInstanceFactories";
import { createMenu } from "./leftMenuGeneration";
import { auth0 } from "../lib/auth0";

export const getServerSideProps = auth0.withPageAuthRequired({
    getServerSideProps: profileGetSspData,
});

async function profileGetSspData(
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

    const data = await getAccountIndexData(accessToken.token);
    return {
        props: data,
    };
}

export const getAccountIndexData = async (accessToken: string) => {
    const userData = await getUserData(accessToken);
    const userOrgs = userData.memberships.reduce(
        (acc, membership) => [
            ...acc,
            {
                name: membership.organisation.name,
                uuid: membership.organisation.uuid,
            },
        ],
        [] as { name: string; uuid: string }[],
    );
    // org data permissions are enforced on the server
    // so we can just return the data
    const menuData = await createMenu(userOrgs);

    return {
        menuSections: menuData,
        currentUser: JSON.parse(JSON.stringify(userData)),
    };
};

export const getUserData = async (accessToken: string) => {
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
