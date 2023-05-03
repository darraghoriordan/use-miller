/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    //output: "standalone",
    eslint: {
        dirs: ["src"],
        ignoreDuringBuilds: true, // lint doesnt match build lint
    },

    experimental: {
        scrollRestoration: true,
        instrumentationHook: true,
    },
    webpack: (config) => {
        config.resolve.extensionAlias = {
            ".js": [".ts", ".tsx", ".jsx", ".js"],
            ".jsx": [".ts", ".tsx", ".jsx", ".js"],
        };

        return config;
    },
};

module.exports = nextConfig;
