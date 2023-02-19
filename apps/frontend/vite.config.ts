import { defineConfig } from "vitest/config";
import reactRefresh from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [reactRefresh()],
    build: {
        target: "es2020",
        commonjsOptions: {
            include: [
                /shared-api-client/,
                /shared-frontend-tooling/,
                /node_modules/,
            ],
        },
    },
    test: {
        globals: true,
    },
    server: { port: 3000 },
    optimizeDeps: {
        include: [
            "@use-miller/shared-api-client",
            "@use-miller/shared-frontend-tooling",
        ],
    },
});
