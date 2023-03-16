/// <reference types="react" />
export type MenuItem = {
    name: string;
    path: string;
};
export type MenuSection = {
    name: string;
    items: MenuItem[];
};
export declare function LeftMenu({ menuSections, currentPath, }: {
    menuSections: MenuSection[];
    currentPath?: string;
}): JSX.Element;
