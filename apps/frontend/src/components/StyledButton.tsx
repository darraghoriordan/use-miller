import clsx from "clsx";
import { PropsWithChildren } from "react";
import { colorVariants, ThemeColor } from "../styles/themeColors.js";

const StyledButton = ({
    onClick,
    className,
    children,
    color,
}: PropsWithChildren & {
    className?: string;
    onClick: () => void;
    color: ThemeColor;
}) => {
    // const styles =
    //     "flex items-center px-4 py-2 text-sm font-medium text-white bg-green-500 border border-transparent rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2";
    return (
        <button
            type="button"
            onClick={() => onClick()}
            className={clsx(
                `focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center px-4 py-2 text-sm text-center font-medium text-white border border-transparent rounded-md shadow-sm`,
                colorVariants[color].background,
                colorVariants[color].hoverBackground,
                colorVariants[color].hoverShadow,
                colorVariants[color].hoverFocusRing,
                className
            )}
        >
            {children}
        </button>
    );
};

export default StyledButton;
