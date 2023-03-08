/// <reference types="react" />
export type MenuItem = {
    name: string;
    path: string;
    isCurrent: boolean;
};
export type MenuSection = {
    name: string;
    items: MenuItem[];
};
export declare function LeftMenu({ menuSections }: {
    menuSections: MenuSection[];
}): JSX.Element;
