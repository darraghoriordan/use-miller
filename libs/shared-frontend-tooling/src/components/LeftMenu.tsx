import clsx from "clsx";
import { colorVariants } from "../themeColors.js";

export type MenuItem = {
    name: string;
    path: string;
    isCurrent: boolean;
};
export type MenuSection = {
    name: string;
    items: MenuItem[];
};
export function LeftMenu({ menuSections }: { menuSections: MenuSection[] }) {
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
                {menuSections.map((section) => (
                    <div key={section.name}>
                        <h3 className="mb-2 font-bold text-white uppercase">
                            {section.name}
                        </h3>
                        <ul className="mr-4">
                            {section.items.map((item) => {
                                if (item.isCurrent) {
                                    return (
                                        <li
                                            key={item.path}
                                            className={clsx(
                                                "px-2 py-1 mb-2 ml-1 text-sm rounded-md whitespace-nowrap",
                                                colorVariants["green"]
                                                    .backgroundShade
                                            )}
                                        >
                                            <p
                                                className={clsx(
                                                    colorVariants["green"]
                                                        .foreground
                                                )}
                                            >
                                                {item.name}
                                            </p>
                                        </li>
                                    );
                                }
                                return (
                                    <li
                                        key={item.path}
                                        className="px-2 mb-2 ml-1 text-sm text-white whitespace-nowrap"
                                    >
                                        <a
                                            href={item.path}
                                            className="cursor-pointer"
                                        >
                                            {item.name}
                                        </a>
                                    </li>
                                );
                            })}
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
