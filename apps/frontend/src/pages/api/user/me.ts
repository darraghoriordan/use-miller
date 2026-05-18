import { NextApiRequest, NextApiResponse } from "next";
import { auth0 } from "../../../lib/auth0";
import { getCurrentUser } from "../../../dashboard/dashboardDataService";

export default auth0.withApiAuthRequired(async function getCurrentUserApi(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method !== "GET") {
        res.setHeader("Allow", ["GET"]);
        res.setHeader("Cache-Control", "no-store");
        res.status(405).json({ error: "Method not allowed" });
        return;
    }

    try {
        const accessToken = await auth0.getAccessToken(req, res);
        if (!accessToken?.token) {
            res.setHeader("Cache-Control", "no-store");
            res.status(401).json({ error: "No access token" });
            return;
        }

        const user = await getCurrentUser(accessToken.token);
        res.setHeader("Cache-Control", "no-store");
        res.status(200).json(user);
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Internal server error";
        res.setHeader("Cache-Control", "no-store");
        res.status(500).json({ error: message });
    }
});
