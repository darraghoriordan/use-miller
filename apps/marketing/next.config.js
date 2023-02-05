/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    eslint: {
        dirs: ["src"],
        ignoreDuringBuilds: true, // lint doesnt match build lint
    },

    experimental: {
        scrollRestoration: true,
    },
};

module.exports = nextConfig;
