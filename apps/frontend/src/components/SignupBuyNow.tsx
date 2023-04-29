import { UserDto } from "@use-miller/shared-api-client";
import clsx from "clsx";
import { ThemeColor } from "../styles/themeColors.js";
import { getSignUpUrl } from "./signupUrl.js";
import StyledLink from "./StyledLink.jsx";
import { BuyNowButton } from "./BuyNowButton.jsx";

/**
 * Logged in users go to payment
 * Logged out users go to sign up
 * @param param0
 * @returns
 */
export function SignUpBuyNowButton({
    user,
    productKey,
    color,
    className,
    text,
}: {
    user: UserDto;
    productKey: string;
    color: ThemeColor;
    className?: string;
    text?: string;
}) {
    if (!user) {
        return (
            <StyledLink
                href={getSignUpUrl({ productKey })}
                color={color}
                className={clsx(
                    "rounded-lg text-xl px-14 py-4 hover:shadow-lg border-white",
                    className
                )}
            >
                {text || "Sign up and buy"}
            </StyledLink>
        );
    }

    return (
        <BuyNowButton
            user={user}
            productKey={productKey}
            color={color}
            className={className}
            text={text}
        />
    );
}
