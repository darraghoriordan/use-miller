import { NextApiRequest, NextApiResponse } from "next";
import { getCurrentUser } from "../../../dashboard/dashboardDataService";
import {
    getBackendAuthHeaders,
    withApiAuthRequired,
} from "../../../lib/server-auth";

export default withApiAuthRequired(async function getCurrentUserApi(
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
        const authentication = getBackendAuthHeaders(req);
        const user = await getCurrentUser(authentication.cookie);
        res.setHeader("Cache-Control", "no-store");
        res.status(200).json(user);
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Internal server error";
        res.setHeader("Cache-Control", "no-store");
        res.status(500).json({ error: message });
    }
});
