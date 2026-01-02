import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import { getAuthenticatedApiInstance } from "../../../api-services/apiInstanceFactories.js";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { ghUsername, orgUuid } = req.body as {
            ghUsername: string;
            orgUuid: string;
        };
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
        res.json(error);
        res.status(500).end();
    }
};

export default withApiAuthRequired(handler);
