import clsx from "clsx";
import { useEffect, useState } from "react";
import { colorVariants } from "../themeColors.js";
import { MenuItem } from "./LeftMenu.js";

export function LeftMenuItem({
    item,
    isCurrent,
}: {
    item: MenuItem;
    isCurrent: boolean;
}) {
    return (
        <li
            key={item.path}
            className={clsx(
                "px-2 mb-2 ml-1 text-sm text-white whitespace-nowrap",
                {
                    [colorVariants["green"].backgroundShade]: isCurrent,
                    ["rounded-md"]: isCurrent,
                }
            )}
        >
            <a
                href={item.path}
                className={clsx("cursor-pointer", {
                    [colorVariants["green"].foreground]: isCurrent,
                })}
            >
                {item.name}
            </a>
        </li>
    );
}
