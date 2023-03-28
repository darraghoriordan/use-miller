import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { UserOnboardingApi } from "@use-miller/shared-api-client";
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

        const apiClient = await getAuthenticatedApiInstance(
            UserOnboardingApi,
            process.env.NEXT_PUBLIC_API_BASE_PATH!,
            atResponse.accessToken!,
            fetch
        );

        const data = await apiClient.userOnboardingControllerAddForOrg({
            orgGithubUserDto: {
                ghUsername,
                orgUuid,
            },
        });

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
