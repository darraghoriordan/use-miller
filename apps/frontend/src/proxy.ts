import { auth0 } from "./lib/auth0";

export async function proxy(request: Request) {
    const url = new URL(request.url);

    // Only run auth middleware on /auth paths to avoid rolling session race condition
    // See: https://github.com/auth0/nextjs-auth0/issues/2335
    // When rolling sessions are enabled, in-flight requests completing after logout
    // can restore the session cookies, causing logout to fail.
    if (url.pathname.startsWith("/auth")) {
        return await auth0.middleware(request);
    }

    // For all other paths, continue without auth middleware processing
    // Note: This disables rolling sessions (auto-extend on activity)
    return new Response(null, {
        status: 200,
        headers: { "x-middleware-next": "1" },
    });
}

export const config = {
    matcher: [
        /*
         * Match auth paths and paths that need session access.
         * We limit this to avoid the rolling session race condition.
         */
        "/auth/:path*",
    ],
};
