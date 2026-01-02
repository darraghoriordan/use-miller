import { getAccessToken, getSession } from "@auth0/nextjs-auth0";
import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import { getAuthenticatedApiInstance } from "../api-services/apiInstanceFactories.js";

export async function getMarketingServerSideProps(
    context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
) {
    const session = await getSession(context.req, context.res);
    if (!session) {
        return {
            props: {
                user: null,
            },
        };
    }
    try {
        const atResponse = await getAccessToken(context.req, context.res, {
            scopes: ["openid", "email", "profile", "offline_access"],
        });
        const apiClient = getAuthenticatedApiInstance({
            apiBase: process.env.NEXT_PUBLIC_API_BASE_PATH!,
            authToken: atResponse.accessToken!,
            fetchApi: fetch,
        });

        const { data: user, error } = await apiClient.GET("/user/{uuid}", {
            params: { path: { uuid: "me" } },
        });

        if (error || !user) {
            throw new Error("Failed to fetch user");
        }

        return {
            props: JSON.parse(
                JSON.stringify({
                    user,
                }),
            ),
        };
    } catch (error) {
        // log user out of auth0
        return {
            redirect: {
                destination: "/api/auth/logout",
                permanent: false,
            },
        };
    }
}
