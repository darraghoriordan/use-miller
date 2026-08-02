import { afterEach, describe, expect, it, vi } from "vitest";
import { sendAuthenticationEmail } from "./auth-email.js";

describe("sendAuthenticationEmail", () => {
    afterEach(() => {
        vi.restoreAllMocks();
        vi.unstubAllEnvs();
    });

    it("logs auth links locally when email delivery is disabled", async () => {
        vi.stubEnv("NODE_ENV", "development");
        vi.stubEnv("EMAIL_SYNC_SEND_ENABLED", "false");
        const log = vi
            .spyOn(console, "info")
            .mockImplementation(() => undefined);

        await sendAuthenticationEmail({
            to: "user@example.test",
            subject: "Reset password",
            text: "http://localhost/reset-token",
        });

        expect(log).toHaveBeenCalledWith(
            "[auth email] Reset password for user@example.test: http://localhost/reset-token",
        );
    });

    it("requires enabled email delivery in production", async () => {
        vi.stubEnv("NODE_ENV", "production");
        vi.stubEnv("EMAIL_SYNC_SEND_ENABLED", "false");

        await expect(
            sendAuthenticationEmail({
                to: "user@example.test",
                subject: "Verify email",
                text: "https://example.test/verify-token",
            }),
        ).rejects.toThrow("EMAIL_SYNC_SEND_ENABLED must be true");
    });
});
