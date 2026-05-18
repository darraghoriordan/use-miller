import type { components } from "../shared/types/api-specs";
type UserDto = components["schemas"]["UserDto"];
import clsx from "clsx";
import { ThemeColor } from "../styles/themeColors";
import { useState } from "react";
import StyledButton from "./StyledButton";

// might pass this in as a param later
const productMapping = [
    {
        productKey: "miller-start",
        stripePriceId: process.env.NEXT_PUBLIC_STRIPE_REGULAR_PRICE_ID,
        mode: "subscription",
    },
    {
        productKey: "miller-start-consulting",
        stripePriceId:
            process.env.NEXT_PUBLIC_STRIPE_MILLER_CONSULTING_PRICE_ID,
        mode: "subscription",
    },

    {
        productKey: "dev-shell",
        stripePriceId:
            process.env.NEXT_PUBLIC_STRIPE_REGULAR_PRICE_NO_RECURRENCE_ID,
        mode: "payment",
    },
];
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

    const product = productMapping.find((p) => p.productKey === productKey);
    if (!product) {
        throw new Error(`Product ${productKey} not found`);
    }

    const onClick = async () => {
        setIsLoading(true);
        const response = await fetch("/api/user/me");
        if (!response.ok) {
            setIsLoading(false);
            window.location.href = "/auth/login";
            return;
        }

        const currentUser = (await response.json()) as UserDto;
        const orgUuid = currentUser.memberships?.find((membership) =>
            membership.roles?.some((role) => role.name === "owner"),
        )?.organisation?.uuid;

        if (!orgUuid) {
            setIsLoading(false);
            throw new Error(
                "User must be an owner of an organisation to purchase",
            );
        }

        const checkoutResponse = await fetch("/api/stripe/checkout-link", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                successFrontendPath: "/dashboard",
                cancelFrontendPath: "/dashboard",
                lineItems: [
                    {
                        price: product.stripePriceId,
                        quantity: 1,
                    },
                ],
                mode: product.mode,
                organisationUuid: orgUuid,
            }),
        });

        if (!checkoutResponse.ok) {
            setIsLoading(false);
            throw new Error("Failed to create checkout session");
        }

        const link = (await checkoutResponse.json()) as {
            stripeSessionUrl: string;
        };

        window.location.href = link.stripeSessionUrl;
    };

    return (
        <StyledButton
            onClick={onClick}
            color={color}
            disabled={isLoading}
            className={clsx(
                "rounded-lg text-xl px-14 py-4 hover:shadow-lg border-white",
                className,
            )}
        >
            {isLoading ? "Loading..." : text || "Buy now"}
        </StyledButton>
    );
}
