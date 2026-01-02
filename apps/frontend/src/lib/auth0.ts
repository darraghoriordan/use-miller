import { Auth0Client } from "@auth0/nextjs-auth0/server";

export const auth0 = new Auth0Client({
    authorizationParameters: {
        scope: "openid profile email offline_access",
        audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
    },
});
