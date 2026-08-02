import type {
    GetServerSideProps,
    GetServerSidePropsContext,
    NextApiHandler,
} from "next";
import type { IncomingMessage, ServerResponse } from "node:http";
import type { AuthSession } from "./auth-client";

function authEndpoint(path: string): string {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_PATH;
    if (!baseUrl) {
        throw new Error("NEXT_PUBLIC_API_BASE_PATH is not configured");
    }
    return `${baseUrl.replace(/\/$/u, "")}/api/auth/${path}`;
}

export function getBackendAuthHeaders(
    request: Pick<IncomingMessage, "headers">,
): Record<string, string> {
    const headers: Record<string, string> = {};
    if (request.headers.cookie) {
        headers.cookie = request.headers.cookie;
    }
    if (request.headers.authorization) {
        headers.authorization = request.headers.authorization;
    }
    return headers;
}

export async function getServerSession(
    request: Pick<IncomingMessage, "headers">,
    response?: Pick<ServerResponse, "appendHeader">,
): Promise<AuthSession | null> {
    const sessionResponse = await fetch(authEndpoint("get-session"), {
        method: "GET",
        headers: getBackendAuthHeaders(request),
        cache: "no-store",
    });
    if (!sessionResponse.ok) {
        return null;
    }

    if (response) {
        for (const cookie of sessionResponse.headers.getSetCookie()) {
            response.appendHeader("Set-Cookie", cookie);
        }
    }

    return (await sessionResponse.json()) as AuthSession | null;
}

export function withPageAuthRequired<Props extends Record<string, unknown>>(
    getServerSideProps: GetServerSideProps<Props>,
): GetServerSideProps<Props> {
    return async (context: GetServerSidePropsContext) => {
        const session = await getServerSession(context.req, context.res);
        if (!session) {
            const returnTo = encodeURIComponent(context.resolvedUrl);
            return {
                redirect: {
                    destination: `/auth/login?returnTo=${returnTo}`,
                    permanent: false,
                },
            };
        }
        return getServerSideProps(context);
    };
}

export function withSuperAdminPageRequired<
    Props extends Record<string, unknown>,
>(getServerSideProps: GetServerSideProps<Props>): GetServerSideProps<Props> {
    return async (context: GetServerSidePropsContext) => {
        const session = await getServerSession(context.req, context.res);
        if (!session) {
            const returnTo = encodeURIComponent(context.resolvedUrl);
            return {
                redirect: {
                    destination: `/auth/login?returnTo=${returnTo}`,
                    permanent: false,
                },
            };
        }
        const isAdmin = (session.user.role ?? "")
            .split(",")
            .map((role) => role.trim().toLowerCase())
            .includes("admin");
        if (!isAdmin) {
            return {
                redirect: { destination: "/dashboard", permanent: false },
            };
        }
        return getServerSideProps(context);
    };
}

export function withApiAuthRequired(handler: NextApiHandler): NextApiHandler {
    return async (request, response) => {
        const session = await getServerSession(request, response);
        if (!session) {
            response.setHeader("Cache-Control", "no-store");
            response.status(401).json({ error: "Authentication required" });
            return;
        }
        return handler(request, response);
    };
}
