import { NextApiRequest, NextApiResponse } from "next";
import { auth0 } from "../../../lib/auth0";
import { getCurrentUser } from "../../../dashboard/dashboardDataService";

export default auth0.withApiAuthRequired(async function getCurrentUserApi(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        const accessToken = await auth0.getAccessToken(req, res);
        if (!accessToken?.token) {
            res.status(401).json({ error: "No access token" });
            return;
        }

        const user = await getCurrentUser(accessToken.token);
        res.status(200).json(user);
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Internal server error";
        res.status(500).json({ error: message });
    }
});
