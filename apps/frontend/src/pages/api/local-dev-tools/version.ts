import { NextApiRequest, NextApiResponse } from "next";

const LATEST_YML_URL =
    "https://assets.darraghoriordan.com/localDevTools/gr-hosting/latest.yml";

export type LocalDevToolsVersionResponse = {
    version: string;
    releaseDate?: string;
};

export default async function getLocalDevToolsVersion(
    req: NextApiRequest,
    res: NextApiResponse<LocalDevToolsVersionResponse | { error: string }>,
) {
    if (req.method !== "GET") {
        res.setHeader("Allow", ["GET"]);
        res.status(405).json({ error: "Method not allowed" });
        return;
    }

    try {
        const response = await fetch(LATEST_YML_URL, {
            headers: {
                Accept: "text/plain",
            },
        });

        if (!response.ok) {
            throw new Error(
                `Failed to fetch latest.yml: ${response.status} ${response.statusText}`,
            );
        }

        const yamlContent = await response.text();

        // Parse version from YAML (format: "version: 1.74.4")
        const versionMatch = yamlContent.match(/^version:\s*(.+)$/m);
        if (!versionMatch || !versionMatch[1]) {
            throw new Error("Could not parse version from latest.yml");
        }

        const version = versionMatch[1].trim();

        // Optionally parse releaseDate (format: "releaseDate: '2026-01-04T22:01:37.839Z'")
        const releaseDateMatch = yamlContent.match(
            /^releaseDate:\s*['"]?([^'"]+)['"]?$/m,
        );
        const releaseDate = releaseDateMatch?.[1]?.trim();

        // Cache for 5 minutes on CDN/browser, allow stale-while-revalidate for 1 minute
        res.setHeader(
            "Cache-Control",
            "public, s-maxage=300, stale-while-revalidate=60",
        );
        res.setHeader("Content-Type", "application/json");
        res.status(200).json({ version, releaseDate });
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Failed to fetch version";
        console.error("[local-dev-tools/version]", message);
        res.status(500).json({ error: message });
    }
}
