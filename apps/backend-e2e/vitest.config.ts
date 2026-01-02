/// <reference types="vitest" />
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        globals: true,
        root: "./src",
        include: ["**/*.e2e-spec.ts"],
        setupFiles: ["./preRun.ts"],
        testTimeout: 30_000,
        hookTimeout: 30_000,
        // Run tests sequentially since they depend on database state
        sequence: {
            concurrent: false,
        },
        pool: "forks",
        poolOptions: {
            forks: {
                singleFork: true,
            },
        },
    },
});
