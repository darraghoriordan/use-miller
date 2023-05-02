import { UserDto } from "@use-miller/shared-api-client";
import clsx from "clsx";
import { ThemeColor } from "../styles/themeColors.js";
import StyledButton from "./StyledButton.jsx";

/**
 * Logged in users go to payment
 * Logged out users go to sign up
 * @param param0
 * @returns
 */
export function BuyNowButton({
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
    return (
        <StyledButton
            // onClick={onClick}
            color={color}
            className={clsx(
                "rounded-lg text-xl px-14 py-4 hover:shadow-lg border-white",
                className
            )}
        >
            {text || "Buy now"}
        </StyledButton>
    );
}
