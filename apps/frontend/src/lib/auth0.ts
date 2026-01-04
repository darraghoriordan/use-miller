import {
    Auth0Client,
    filterDefaultIdTokenClaims,
} from "@auth0/nextjs-auth0/server";

export const auth0 = new Auth0Client({
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    secret: process.env.AUTH0_SECRET,
    appBaseUrl: process.env.APP_BASE_URL,
    // Use v2 logout strategy - clears cookies BEFORE redirect to Auth0
    // This is more reliable than OIDC logout which clears cookies on return
    logoutStrategy: "v2",
    authorizationParameters: {
        scope: "openid profile email offline_access",
        audience: process.env.AUTH0_AUDIENCE,
    },
    // Reduce session size to prevent chunked cookies (multiple __session.X cookies)
    // This keeps only essential claims and improves performance
    async beforeSessionSaved(session) {
        return {
            ...session,
            user: filterDefaultIdTokenClaims(session.user),
        };
    },
});
