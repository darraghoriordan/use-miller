import { PropsWithChildren } from "react";
declare const StyledButton: ({ onClick, className, children, }: {
    children?: import("react").ReactNode;
} & {
    className?: string | undefined;
    onClick: () => void;
}) => JSX.Element;
export default StyledButton;
