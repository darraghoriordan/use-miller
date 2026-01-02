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
    async rewrites() {
        return [
            {
                source: "/plaus/js/script.js",
                destination: "https://plausible.io/js/script.js",
            },
            {
                source: "/plaus/api/event",
                destination: "https://plausible.io/api/event",
            },
        ];
    },
};

module.exports = nextConfig;
