import type { components } from "../shared/types/api-specs";
type UserDto = components["schemas"]["UserDto"];
import clsx from "clsx";
import { ThemeColor } from "../styles/themeColors";
import { useState } from "react";
import StyledButton from "./StyledButton";
import { trackCheckoutIntent } from "../lib/analytics";

/**
 * Logged in users go to payment
 * Logged out users go to sign up
 * @param param0
 * @returns
 */
export function BuyNowButton({
    productKey,
    color,
    className,
    text,
}: {
    productKey: string;
    color: ThemeColor;
    className?: string;
    text?: string;
}) {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const onClick = async () => {
        trackCheckoutIntent(productKey);
        setIsLoading(true);
        setErrorMessage(null);
        try {
            const response = await fetch("/api/user/me", {
                cache: "no-store",
            });
            if (!response.ok) {
                window.location.href = "/auth/login";
                return;
            }

            const currentUser = (await response.json()) as UserDto;
            const orgUuid = currentUser.memberships?.find((membership) =>
                membership.roles?.some((role) => role.name === "owner"),
            )?.organisation?.uuid;

            if (!orgUuid) {
                throw new Error(
                    "You must be an organisation owner before purchasing.",
                );
            }

            const checkoutResponse = await fetch("/api/stripe/checkout-link", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Idempotency-Key": globalThis.crypto.randomUUID(),
                },
                body: JSON.stringify({
                    successFrontendPath: "/dashboard",
                    cancelFrontendPath: "/dashboard",
                    productKey,
                    organisationUuid: orgUuid,
                }),
            });

            if (!checkoutResponse.ok) {
                throw new Error("Unable to start checkout right now.");
            }

            const link = (await checkoutResponse.json()) as {
                stripeSessionUrl: string;
            };

            window.location.href = link.stripeSessionUrl;
        } catch (error) {
            setErrorMessage(
                error instanceof Error
                    ? error.message
                    : "Unable to start checkout right now.",
            );
            setIsLoading(false);
        }
    };

    return (
        <div>
            <StyledButton
                onClick={() => void onClick()}
                color={color}
                disabled={isLoading}
                className={clsx(
                    "rounded-lg text-xl px-14 py-4 hover:shadow-lg border-white",
                    className,
                )}
            >
                {isLoading ? "Loading..." : text || "Buy now"}
            </StyledButton>
            {errorMessage && (
                <p className="mt-2 text-sm text-red-200" role="alert">
                    {errorMessage}
                </p>
            )}
        </div>
    );
}
