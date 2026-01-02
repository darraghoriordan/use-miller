import { NextApiRequest, NextApiResponse } from "next";
import { getAuthenticatedApiInstance } from "../../../api-services/apiInstanceFactories";
import type { components } from "../../../shared/types/api-specs";
import { auth0 } from "../../../lib/auth0";

type StripeCustomerPortalRequestDto =
    components["schemas"]["StripeCustomerPortalRequestDto"];

// there is a bit of misdirection here so we can use the
// access token. We call the next api which in turn calls the
// backend api
export default async function getStripeCustomerPortalLink(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        const session = await auth0.getSession(req);
        if (!session) {
            res.status(401).json({ error: "Not authenticated" });
            return;
        }

        const accessToken = await auth0.getAccessToken(req, res);
        if (!accessToken?.token) {
            res.status(401).json({ error: "No access token" });
            return;
        }

        const requestBody = req.body as StripeCustomerPortalRequestDto;

        const apiClient = getAuthenticatedApiInstance({
            apiBase: process.env.NEXT_PUBLIC_API_BASE_PATH!,
            authToken: accessToken.token,
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
