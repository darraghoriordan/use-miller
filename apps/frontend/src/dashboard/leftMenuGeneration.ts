export const createMenu = (
    userOrgs: { name: string; uuid: string }[],
    isSuper = false,
) => {
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
                path: "/auth/logout",
            },
        ],
    });

    if (isSuper) {
        menuSections.push({
            name: "Operations",
            slug: "operations",
            items: [
                {
                    name: "Admin overview",
                    path: "/super-admin",
                },
                {
                    name: "Identity users",
                    path: "/super-admin/identities",
                },
            ],
        });
    }

    return menuSections;
};
