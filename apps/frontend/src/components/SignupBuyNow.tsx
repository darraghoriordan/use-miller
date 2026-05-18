import { useUser } from "@auth0/nextjs-auth0/client";
import clsx from "clsx";
import { ThemeColor } from "../styles/themeColors";
import { getSignUpUrl } from "./signupUrl";
import StyledLink from "./StyledLink";
import { BuyNowButton } from "./BuyNowButton";

/**
 * Logged in users go to payment
 * Logged out users go to sign up
 * @param param0
 * @returns
 */
export function SignUpBuyNowButton({
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
    const { user, isLoading } = useUser();

    if (isLoading) {
        return (
            <div
                className={clsx(
                    "rounded-lg text-xl px-14 py-4 border border-security-border text-security-muted",
                    className,
                )}
            >
                Loading...
            </div>
        );
    }

    if (!user) {
        return (
            <StyledLink
                href={getSignUpUrl({ productKey })}
                color={color}
                className={clsx(
                    "rounded-lg text-xl px-14 py-4 hover:shadow-lg border-white",
                    className,
                )}
            >
                {text || "Sign up and buy"}
            </StyledLink>
        );
    }

    return (
        <BuyNowButton
            productKey={productKey}
            color={color}
            className={className}
            text={text}
        />
    );
}
