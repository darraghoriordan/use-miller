import clsx from "clsx";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { colorVariants, ThemeColor } from "../styles/themeColors.js";

const StyledLink = ({
    href,
    className,
    children,
    color,
}: PropsWithChildren & {
    href: string;
    color: ThemeColor;
    className?: string;
}) => {
    return (
        <Link
            href={href}
            className={clsx(
                `focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm`,
                colorVariants[color].background,
                colorVariants[color].hoverBackground,
                colorVariants[color].hoverShadow,
                colorVariants[color].hoverFocusRing,
                className
            )}
        >
            {children}
        </Link>
    );
};

export default StyledLink;
