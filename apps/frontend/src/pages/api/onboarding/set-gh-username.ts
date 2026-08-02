import { NextApiRequest, NextApiResponse } from "next";
import { getAuthenticatedApiInstance } from "../../../api-services/apiInstanceFactories";
import {
    getBackendAuthHeaders,
    withApiAuthRequired,
} from "../../../lib/server-auth";

export default withApiAuthRequired(async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        res.setHeader("Cache-Control", "no-store");
        res.status(405).json({ error: "Method not allowed" });
        return;
    }

    try {
        const { ghUsername, orgUuid } = req.body as {
            ghUsername: string;
            orgUuid: string;
        };

        const authentication = getBackendAuthHeaders(req);
        const apiClient = getAuthenticatedApiInstance({
            apiBase: process.env.NEXT_PUBLIC_API_BASE_PATH!,
            cookie: authentication.cookie,
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
        res.setHeader("Cache-Control", "no-store");
        res.status(500).json({ error: message });
    }
});
