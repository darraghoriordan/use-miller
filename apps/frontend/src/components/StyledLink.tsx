import clsx from "clsx";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { colorVariants, ThemeColor } from "../styles/themeColors";

export type LinkVariant = "solid" | "outline" | "ghost";

const StyledLink = ({
    href,
    className,
    children,
    target,
    color = "primary",
    variant = "solid",
}: PropsWithChildren & {
    href: string;
    color?: ThemeColor;
    variant?: LinkVariant;
    target?: "_blank" | undefined;
    className?: string;
}) => {
    const baseStyles =
        "inline-flex items-center justify-center px-5 py-2.5 font-mono text-sm font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-security-black";

    const variantStyles = {
        solid: clsx(
            colorVariants[color].background,
            "text-security-black",
            colorVariants[color].hoverBackground,
            colorVariants[color].hoverGlow,
            colorVariants[color].focusRing,
        ),
        outline: clsx(
            "bg-transparent border",
            colorVariants[color].border,
            colorVariants[color].foreground,
            colorVariants[color].hoverBorder,
            colorVariants[color].hoverGlow,
            colorVariants[color].focusRing,
        ),
        ghost: clsx(
            "bg-transparent",
            "text-security-text",
            colorVariants[color].hoverForeground,
            colorVariants[color].hoverBackground,
            colorVariants[color].focusRing,
        ),
    };

    return (
        <Link
            href={href}
            target={target}
            className={clsx(baseStyles, variantStyles[variant], className)}
        >
            {children}
        </Link>
    );
};

export default StyledLink;
