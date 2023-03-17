import { colorVariants } from "@use-miller/shared-frontend-tooling";
import clsx from "clsx";
import { useRouter } from "next/router.js";
import { LeftMenuItem } from "./LeftMenuItem.js";

export type MenuItem = {
    name: string;
    path: string;
};
export type MenuSection = {
    name: string;
    items: MenuItem[];
};

const isCurrentMenuItem = (path: string, item: MenuItem) => {
    // special case for the root of docs
    if (path === "/docs" && item.path === "/docs/get-started-installation")
        return true;
    // special case for the reference docs route
    if (path.includes("/docs/reference")) {
        return path.includes(item.path.replace("/L1JFQURNRS5tZA==", ""));
    }

    return item.path === path;
};

export function LeftMenu({ menuSections }: { menuSections: MenuSection[] }) {
    const path = useRouter();

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
                                    isCurrent={isCurrentMenuItem(
                                        path.asPath,
                                        item
                                    )}
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
