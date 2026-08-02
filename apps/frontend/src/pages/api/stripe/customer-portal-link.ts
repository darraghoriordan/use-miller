import { NextApiRequest, NextApiResponse } from "next";
import { getAuthenticatedApiInstance } from "../../../api-services/apiInstanceFactories";
import type { components } from "../../../shared/types/api-specs";
import {
    getBackendAuthHeaders,
    withApiAuthRequired,
} from "../../../lib/server-auth";

type StripeCustomerPortalRequestDto =
    components["schemas"]["StripeCustomerPortalRequestDto"];

export default withApiAuthRequired(async function getStripeCustomerPortalLink(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        res.setHeader("Cache-Control", "no-store");
        res.status(405).json({ error: "Method not allowed" });
        return;
    }

    const origin = req.headers.origin;
    if (origin && origin !== new URL(process.env.APP_BASE_URL).origin) {
        res.setHeader("Cache-Control", "no-store");
        res.status(403).json({ error: "Invalid request origin" });
        return;
    }

    try {
        const idempotencyKeyHeader = req.headers["idempotency-key"];
        const idempotencyKey = Array.isArray(idempotencyKeyHeader)
            ? idempotencyKeyHeader[0]
            : idempotencyKeyHeader;
        if (!idempotencyKey) {
            res.setHeader("Cache-Control", "no-store");
            res.status(400).json({ error: "Missing Idempotency-Key" });
            return;
        }

        const requestBody = req.body as StripeCustomerPortalRequestDto;

        const authentication = getBackendAuthHeaders(req);
        const apiClient = getAuthenticatedApiInstance({
            apiBase: process.env.NEXT_PUBLIC_API_BASE_PATH!,
            cookie: authentication.cookie,
            fetchApi: fetch,
        });

        const result = await apiClient.POST(
            "/payments/stripe/customer-portal-session",
            {
                body: requestBody,
                params: { header: { "Idempotency-Key": idempotencyKey } },
            },
        );
        const upstreamStatus = (result as { response: Response }).response
            .status;

        if (result.error || !result.data) {
            const status = [400, 401, 403, 409, 429].includes(upstreamStatus)
                ? upstreamStatus
                : 502;
            res.setHeader("Cache-Control", "no-store");
            res.status(status).json({
                error: "Unable to open billing right now",
            });
            return;
        }

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Cache-Control", "no-store");
        res.end(JSON.stringify(result.data));
    } catch (error) {
        const message = "Unable to open billing right now";
        res.setHeader("Cache-Control", "no-store");
        res.status(502).json({ error: message });
    }
});
