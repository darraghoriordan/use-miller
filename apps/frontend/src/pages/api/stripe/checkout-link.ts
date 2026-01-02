import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import { getAuthenticatedApiInstance } from "../../../api-services/apiInstanceFactories.js";
import type { components } from "../../../shared/types/api-specs";

type StripeCheckoutSessionRequestDto =
    components["schemas"]["StripeCheckoutSessionRequestDto"];

export default withApiAuthRequired(getStripeCheckoutLink);

export async function getStripeCheckoutLink(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        const requestBody = req.body as StripeCheckoutSessionRequestDto;

        const atResponse = await getAccessToken(req, res, {
            scopes: ["openid", "email", "profile", "offline_access"],
        });
        if (!atResponse.accessToken) {
            throw new Error("No access token");
        }
        const apiClient = getAuthenticatedApiInstance({
            apiBase: process.env.NEXT_PUBLIC_API_BASE_PATH!,
            authToken: atResponse.accessToken!,
            fetchApi: fetch,
        });

        const { data, error } = await apiClient.POST(
            "/payments/stripe/checkout-session",
            {
                body: requestBody,
            },
        );

        if (error || !data) {
            throw new Error("Failed to create checkout session");
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
