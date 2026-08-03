import type { NextApiRequest, NextApiResponse } from "next";
import { readServerPublicRuntimeConfig } from "../../lib/runtime-config.server";

export default function runtimeConfigHandler(
    request: NextApiRequest,
    response: NextApiResponse,
) {
    if (request.method !== "GET") {
        response.setHeader("Allow", "GET");
        response.status(405).end();
        return;
    }

    const serializedConfig = JSON.stringify(readServerPublicRuntimeConfig())
        .replaceAll("<", "\\u003c")
        .replaceAll(">", "\\u003e")
        .replaceAll("&", "\\u0026");
    response.setHeader("Cache-Control", "no-store");
    response.setHeader("Content-Type", "application/javascript; charset=utf-8");
    response.setHeader("X-Content-Type-Options", "nosniff");
    response
        .status(200)
        .send(`window.__MILLER_RUNTIME_CONFIG__=${serializedConfig};`);
}
