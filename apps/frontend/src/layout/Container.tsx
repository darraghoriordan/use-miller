import clsx from "clsx";
import { PropsWithChildren } from "react";

export const Container = ({
    className,
    ...props
}: { className?: string } & PropsWithChildren) => {
    return <div className={clsx(className, "mx-auto ")} {...props} />;
};
