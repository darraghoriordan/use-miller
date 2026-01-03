import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { colorVariants, ThemeColor } from "../styles/themeColors";
import { LeftMenuItem } from "./LeftMenuItem";

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
        const projectRootPath = path?.split("/").slice(0, -1).join("/");
        return item.path.includes(projectRootPath);
    }

    // otherwise just do a match
    return item.path === path;
};

export function LeftMenu({
    menuSections,
    header,
    headerHref,
    productColor = "primary",
}: {
    menuSections: MenuSection[];
    header: string;
    headerHref?: string;
    productColor?: ThemeColor;
}) {
    const path = useRouter();

    return (
        <div className="flex">
            <div className="flex flex-col grow mr-8">
                <h1
                    className={clsx(
                        "mb-8 font-display font-bold uppercase tracking-wider text-sm",
                        colorVariants[productColor].foreground,
                    )}
                >
                    <Link
                        className="hover:cursor-pointer transition-opacity hover:opacity-80"
                        href={headerHref || "#"}
                    >
                        {header}
                    </Link>
                </h1>
                {menuSections?.map((section) => (
                    <div key={section.name}>
                        <h3 className="mb-2 mt-6 font-mono text-xs font-semibold text-security-light uppercase tracking-wider">
                            {section.name}
                        </h3>
                        <ul className="mr-4 space-y-1">
                            {section.items.map((item) => (
                                <LeftMenuItem
                                    key={item.path}
                                    item={item}
                                    isCurrent={isCurrentMenuItem(
                                        path.asPath,
                                        item,
                                    )}
                                    productColor={productColor}
                                />
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="flex flex-col">
                <div
                    className={clsx(
                        "h-full w-px",
                        colorVariants[productColor].background,
                        "opacity-50",
                    )}
                >
                    &nbsp;
                </div>
            </div>
        </div>
    );
}
