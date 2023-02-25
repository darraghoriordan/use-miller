import clsx from "clsx";
import { PropsWithChildren } from "react";

const StyledLink = ({
    href,
    className,
    children,
}: PropsWithChildren & { href: string; className?: string }) => {
    const styles =
        "inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-500 border border-transparent rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2";
    return (
        <a href={href} className={clsx(styles, className)}>
            {children}
        </a>
    );
};

export default StyledLink;
