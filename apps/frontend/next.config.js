/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: "standalone",

    experimental: {
        scrollRestoration: true,
    },
    // Add empty turbopack config to silence Turbopack warning
    turbopack: {
        resolveAlias: {
            // Handle .js extension resolution for TypeScript files
        },
    },
};

module.exports = nextConfig;
