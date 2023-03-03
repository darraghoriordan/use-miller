import clsx from "clsx";
import { PropsWithChildren } from "react";
import { colorVariants } from "../themeColors";

const StyledLink = ({
    href,
    className,
    children,
    color,
}: PropsWithChildren & {
    href: string;
    color: "green" | "cyan" | "amber" | "red" | "violet" | "pink";
    className?: string;
}) => {
    return (
        <a
            href={href}
            className={clsx(
                `focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm`,
                colorVariants[color].background,
                colorVariants[color].hoverBackground,
                colorVariants[color].hoverShadow,
                colorVariants[color].hoverFocusRing,
                className
            )}
        >
            {children}
        </a>
    );
};

export default StyledLink;
