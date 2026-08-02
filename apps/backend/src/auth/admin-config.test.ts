import { afterEach, describe, expect, it } from "vitest";
import {
    configuredAdminEmails,
    hasAdminRole,
    isConfiguredAdminEmail,
} from "./admin-config.js";

describe("admin configuration", () => {
    const originalSuperUserEmails = process.env.SUPER_USER_EMAILS;

    afterEach(() => {
        process.env.SUPER_USER_EMAILS = originalSuperUserEmails;
    });

    it("normalizes and deduplicates configured owner emails", () => {
        process.env.SUPER_USER_EMAILS =
            "Owner@Example.com, member@example.com,owner@example.com";

        expect(configuredAdminEmails()).toEqual([
            "owner@example.com",
            "member@example.com",
        ]);
        expect(isConfiguredAdminEmail(" OWNER@example.com ")).toBe(true);
    });

    it("recognizes admin among multiple Better Auth roles", () => {
        expect(hasAdminRole("user,admin")).toBe(true);
        expect(hasAdminRole("user")).toBe(false);
    });
});
