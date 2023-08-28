import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

export default handleAuth({
    async login(req: NextApiRequest, res: NextApiResponse) {
        await handleLogin(req, res, {
            // returnTo: "/#pricing",
        });
    },
    "401"(_req: NextApiRequest, res: NextApiResponse) {
        res.status(401).json({
            error: "not_authenticated",
            description:
                "The user does not have an active session or is not authenticated",
        });
    },
    async signup(req: NextApiRequest, res: NextApiResponse) {
        await handleLogin(req, res, {
            // returnTo: "/#pricing",
            authorizationParams: {
                // Could conditionally pass params via req.query auth/login/?screen_hint=signup
                screen_hint: "signup",
            },
        });
    },
});
