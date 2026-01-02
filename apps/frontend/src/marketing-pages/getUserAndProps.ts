import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import { getAuthenticatedApiInstance } from "../api-services/apiInstanceFactories";
import { auth0 } from "../lib/auth0";

export async function getMarketingServerSideProps(
    context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
) {
    const session = await auth0.getSession(context.req);
    if (!session) {
        return {
            props: {
                user: null,
            },
        };
    }
    try {
        const accessToken = await auth0.getAccessToken(
            context.req,
            context.res,
        );
        if (!accessToken?.token) {
            return {
                props: {
                    user: null,
                },
            };
        }

        const apiClient = getAuthenticatedApiInstance({
            apiBase: process.env.NEXT_PUBLIC_API_BASE_PATH!,
            authToken: accessToken.token,
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
                destination: "/auth/logout",
                permanent: false,
            },
        };
    }
}
