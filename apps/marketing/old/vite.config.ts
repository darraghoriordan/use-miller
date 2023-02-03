import { defineConfig } from "vitest/config";
import reactRefresh from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [reactRefresh()],
    test: {
        globals: true,
    },
});
