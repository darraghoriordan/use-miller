import Link from "next/link";
import { PropsWithChildren } from "react";

export function NavLink({
    href,
    children,
}: { href: string } & PropsWithChildren) {
    return (
        <Link
            href={href}
            className="inline-block rounded-lg py-1 px-2 text-sm text-white hover:bg-slate-100 hover:text-slate-900 md:text-lg"
        >
            {children}
        </Link>
    );
}
