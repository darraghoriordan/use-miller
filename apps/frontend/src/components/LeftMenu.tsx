import clsx from "clsx";
import Link from "next/link.js";
import { useRouter } from "next/router.js";
import { colorVariants } from "../styles/themeColors.js";
import { LeftMenuItem } from "./LeftMenuItem.js";

export type MenuItem = {
    name: string;
    path: string;
};
export type MenuSection = {
    name: string;
    slug: string;
    items: MenuItem[];
};

const isCurrentMenuItem = (path: string, item: MenuItem) => {
    // special case for the root of docs

    if (
        /\/.*\/docs/.test(path) &&
        /\/docs\/.*\/get-started-installation/.test(item.path)
    ) {
        return true;
    }

    //special case for the references roots
    if (path.includes(`/reference/`)) {
        const projectRootPath = path.split("/").slice(0, -1).join("/");
        return item.path.includes(projectRootPath);
    }

    // otherwise just do a match
    return item.path === path;
};

export function LeftMenu({
    menuSections,
    header,
    headerHref,
}: {
    menuSections: MenuSection[];
    header: string;
    headerHref?: string;
}) {
    const path = useRouter();

    return (
        <div className="flex">
            <div className="flex flex-col flex-grow ml-4">
                <h1
                    className={clsx(
                        `mb-8 font-bold uppercase`,
                        colorVariants["green"].foreground
                    )}
                >
                    <Link
                        className="hover:cursor-pointer"
                        href={headerHref || "#"}
                    >
                        {header}
                    </Link>
                </h1>
                {menuSections?.map((section) => (
                    <div key={section.name}>
                        <h3 className="mb-2 mt-4 font-bold text-white uppercase ">
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
