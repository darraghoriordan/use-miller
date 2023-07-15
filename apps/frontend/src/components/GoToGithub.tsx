import clsx from "clsx";
import { ThemeColor } from "../styles/themeColors.js";
import { getGithubUrl } from "./signupUrl.js";
import StyledLink from "./StyledLink.jsx";

export function GoToGithub({
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
            target="_blank"
            className={clsx(
                "rounded-lg text-xl px-14 py-4 hover:shadow-lg border-white",
                className
            )}
        >
            {text || "View code on Github"}
        </StyledLink>
    );
}
