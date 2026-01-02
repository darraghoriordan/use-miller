import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import { getAuthenticatedApiInstance } from "../../../api-services/apiInstanceFactories.js";
import type { components } from "../../../shared/types/api-specs";

type StripeCustomerPortalRequestDto =
    components["schemas"]["StripeCustomerPortalRequestDto"];

export default withApiAuthRequired(getStripeCustomerPortalLink);

// there is a bit of misdirection here so we can use the
// access token. We call the next api which in turn calls the
// backend api
export async function getStripeCustomerPortalLink(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        const requestBody = req.body as StripeCustomerPortalRequestDto;
        const atResponse = await getAccessToken(req, res, {
            scopes: ["openid", "email", "profile", "offline_access"],
        });
        const apiClient = getAuthenticatedApiInstance({
            apiBase: process.env.NEXT_PUBLIC_API_BASE_PATH!,
            authToken: atResponse.accessToken!,
            fetchApi: fetch,
        });

        const { data, error } = await apiClient.POST(
            "/payments/stripe/customer-portal-session",
            {
                body: requestBody,
            },
        );

        if (error || !data) {
            throw new Error("Failed to create customer portal session");
        }

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Cache-Control", "no-store");
        res.end(JSON.stringify(data));
    } catch (error) {
        res.json(error);
        res.status(500).end();
    }
}
