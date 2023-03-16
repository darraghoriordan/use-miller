import clsx from "clsx";
import { useEffect, useState } from "react";
import { colorVariants } from "../themeColors.js";
import { LeftMenuItem } from "./LeftMenuItem.js";

export type MenuItem = {
    name: string;
    path: string;
};
export type MenuSection = {
    name: string;
    items: MenuItem[];
};
export function LeftMenu({
    menuSections,
    currentPath,
}: {
    menuSections: MenuSection[];
    currentPath?: string;
}) {
    const [currentPathMatcher, setCurrentPathMatcher] = useState(
        currentPath || ""
    );
    useEffect(() => {
        if (currentPathMatcher === "") {
            setCurrentPathMatcher(window?.location?.pathname);
        }
    }, []);

    return (
        <div className="flex">
            <div className="flex flex-col flex-grow ml-4 pt-[1em]">
                <h1
                    className={clsx(
                        `mb-8 font-bold uppercase`,
                        colorVariants["green"].foreground
                    )}
                >
                    Docs
                </h1>
                {menuSections?.map((section) => (
                    <div key={section.name}>
                        <h3 className="mb-2 font-bold text-white uppercase">
                            {section.name}
                        </h3>
                        <ul className="mr-4">
                            {section.items.map((item) => (
                                <LeftMenuItem
                                    key={item.path}
                                    item={item}
                                    isCurrent={item.path === currentPathMatcher}
                                />
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="flex flex-col">
                <div
                    style={{
                        background: "linear-gradient(#56d364, #00bcd4)",
                    }}
                    className="h-full w-[2px]"
                >
                    &nbsp;
                </div>
            </div>
        </div>
    );
}
