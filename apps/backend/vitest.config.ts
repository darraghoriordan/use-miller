/// <reference types="vitest" />
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        globals: true,
        root: "./src",
        include: ["**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
        setupFiles: ["./testing/preRun.ts"],
        coverage: {
            provider: "v8",
            include: ["**/src/**/*.ts"],
            exclude: ["**/node_modules/**", "**/*.test.data.ts"],
            reporter: ["text", "json", "lcov", "clover", "cobertura"],
        },
        reporters: ["default"],
        passWithNoTests: true,
    },
});
