import clsx from "clsx";
import Link from "next/link";
import { colorVariants, ThemeColor } from "../styles/themeColors";
import { MenuItem } from "./LeftMenu";

export function LeftMenuItem({
    item,
    isCurrent,
    productColor = "primary",
}: {
    item: MenuItem;
    isCurrent: boolean;
    productColor?: ThemeColor;
}) {
    return (
        <li
            key={item.path}
            className={clsx(
                "px-3 py-1.5 text-sm rounded-md transition-colors",
                {
                    [colorVariants[productColor].backgroundShade]: isCurrent,
                    "text-security-text hover:text-security-light hover:bg-security-dark":
                        !isCurrent,
                },
            )}
        >
            <Link
                href={item.path}
                className={clsx("cursor-pointer block", {
                    [colorVariants[productColor].foreground]: isCurrent,
                    "font-medium": isCurrent,
                })}
            >
                {item.name}
            </Link>
        </li>
    );
}
