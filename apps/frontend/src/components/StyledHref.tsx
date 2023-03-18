import clsx from "clsx";
import { PropsWithChildren } from "react";

const StyledHref = ({
    href,
    children,
}: PropsWithChildren & {
    href: string;
}) => {
    return (
        <a
            href={href}
            className={clsx(
                "inline-block rounded-lg py-1 px-2 text-sm text-white hover:bg-slate-100 hover:text-slate-900 md:text-lg"
            )}
        >
            {children}
        </a>
    );
};

export default StyledHref;
