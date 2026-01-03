import { NextApiRequest, NextApiResponse } from "next";
import { getAuthenticatedApiInstance } from "../../../api-services/apiInstanceFactories";
import { auth0 } from "../../../lib/auth0";

export default auth0.withApiAuthRequired(async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        const accessToken = await auth0.getAccessToken(req, res);
        if (!accessToken?.token) {
            res.status(401).json({ error: "No access token" });
            return;
        }

        const { ghUsername, orgUuid } = req.body as {
            ghUsername: string;
            orgUuid: string;
        };

        const apiClient = getAuthenticatedApiInstance({
            apiBase: process.env.NEXT_PUBLIC_API_BASE_PATH!,
            authToken: accessToken.token,
            fetchApi: fetch,
        });

        const { data, error } = await apiClient.POST(
            "/onboarding/github-user",
            {
                body: {
                    ghUsername,
                    orgUuid,
                },
            },
        );

        if (error || !data) {
            throw new Error("Failed to add github user");
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
