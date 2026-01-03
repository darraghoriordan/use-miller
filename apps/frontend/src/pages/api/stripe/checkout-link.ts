import { NextApiRequest, NextApiResponse } from "next";
import { getAuthenticatedApiInstance } from "../../../api-services/apiInstanceFactories";
import type { components } from "../../../shared/types/api-specs";
import { auth0 } from "../../../lib/auth0";

type StripeCheckoutSessionRequestDto =
    components["schemas"]["StripeCheckoutSessionRequestDto"];

export default auth0.withApiAuthRequired(async function getStripeCheckoutLink(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        const accessToken = await auth0.getAccessToken(req, res);
        if (!accessToken?.token) {
            res.status(401).json({ error: "No access token" });
            return;
        }

        const requestBody = req.body as StripeCheckoutSessionRequestDto;

        const apiClient = getAuthenticatedApiInstance({
            apiBase: process.env.NEXT_PUBLIC_API_BASE_PATH!,
            authToken: accessToken.token,
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
        const message =
            error instanceof Error ? error.message : "Internal server error";
        res.status(500).json({ error: message });
    }
});
