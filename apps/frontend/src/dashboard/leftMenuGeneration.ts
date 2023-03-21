export const createMenu = (userOrgs: { name: string; uuid: string }[]) => {
    const menuSections = [];

    menuSections.push({
        name: "Organisations",
        slug: "organisations",
        items: userOrgs.map((org) => ({
            name: org.name,
            path: `/dashboard/${org.uuid}`,
        })),
    });

    menuSections.push({
        name: "Account",
        slug: "account",
        items: [
            {
                name: "Profile",
                path: "/dashboard/account/profile",
            },
            {
                name: "Sign Out",
                path: "/api/auth/logout",
            },
        ],
    });

    return menuSections;
};
