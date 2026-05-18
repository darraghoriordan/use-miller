import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

const docContentDirectory = path.join(
    process.cwd(),
    "src",
    "docs",
    "page-content",
);

const contentTypes: Record<string, string> = {
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".webp": "image/webp",
};

export default function docsStaticAsset(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method !== "GET") {
        res.setHeader("Allow", ["GET"]);
        res.status(405).json({ error: "Method not allowed" });
        return;
    }

    const assetSegments = req.query.assetPath;
    const assetPath = Array.isArray(assetSegments)
        ? assetSegments
        : assetSegments
          ? [assetSegments]
          : [];

    const resolvedPath = path.resolve(docContentDirectory, ...assetPath);
    if (!resolvedPath.startsWith(docContentDirectory)) {
        res.status(400).json({ error: "Invalid asset path" });
        return;
    }

    if (
        !fs.existsSync(resolvedPath) ||
        fs.statSync(resolvedPath).isDirectory()
    ) {
        res.status(404).json({ error: "Asset not found" });
        return;
    }

    const extension = path.extname(resolvedPath).toLowerCase();
    const contentType = contentTypes[extension] || "application/octet-stream";

    res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    fs.createReadStream(resolvedPath).pipe(res);
}
