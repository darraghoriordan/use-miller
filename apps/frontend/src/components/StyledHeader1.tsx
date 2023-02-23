import clsx from "clsx";
import { PropsWithChildren } from "react";

const StyledHeader1 = ({
    className,
    children,
}: PropsWithChildren & { className?: string }) => {
    const styles =
        "mb-10 text-4xl font-bold leading-tight tracking-tight text-black";
    return <h1 className={clsx(styles, className)}>{children}</h1>;
};

export default StyledHeader1;
