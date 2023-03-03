import { PropsWithChildren } from "react";
declare const StyledLink: ({ href, className, children, color, }: {
    children?: import("react").ReactNode;
} & {
    href: string;
    color: "green" | "cyan" | "amber" | "red" | "violet" | "pink";
    className?: string | undefined;
}) => JSX.Element;
export default StyledLink;
