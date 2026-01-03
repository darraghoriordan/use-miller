import clsx from "clsx";
import { PropsWithChildren } from "react";
import { colorVariants, ThemeColor } from "../styles/themeColors";

export type ButtonVariant = "solid" | "outline" | "ghost";

const StyledButton = ({
    onClick,
    className,
    children,
    color = "primary",
    variant = "solid",
    type,
    disabled = false,
}: PropsWithChildren & {
    className?: string;
    onClick?: () => void;
    color?: ThemeColor;
    variant?: ButtonVariant;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}) => {
    const baseStyles =
        "inline-flex items-center justify-center px-5 py-2.5 font-mono text-sm font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-security-black disabled:opacity-50 disabled:cursor-not-allowed";

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
        <button
            type={type || "button"}
            onClick={onClick ? () => onClick() : undefined}
            className={clsx(baseStyles, variantStyles[variant], className)}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default StyledButton;
