import clsx from "clsx";
import { ThemeColor } from "../styles/themeColors.js";
import { getGithubUrl } from "./signupUrl.js";
import StyledLink from "./StyledLink.jsx";
import GHmark from "../../public/github-icons/github-mark-white.svg";

export function SignUpBuyNowButton({
    color,
    className,
    text,
    productKey,
}: {
    productKey: string;
    color: ThemeColor;
    className?: string;
    text?: string;
}) {
    return (
        <StyledLink
            href={getGithubUrl({ productKey })}
            color={color}
            className={clsx(
                "rounded-lg text-xl px-14 py-4 hover:shadow-lg border-white",
                className
            )}
        >
            <GHmark className="w-5 h-5"></GHmark>
            {text || "View on Github"}
        </StyledLink>
    );
}
