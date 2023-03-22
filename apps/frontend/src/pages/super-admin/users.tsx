import { MenuSection } from "../../components/LeftMenu.jsx";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { User } from "@use-miller/shared-api-client";
import { LeftMenuWrappedContent } from "../../components/LeftMenuWrappedContent.jsx";
import UsersSuperAdmin from "../../super-admin/components/UsersSuperAdmin.jsx";
import { superUserGetUserData } from "../../super-admin/services/superAdminData.js";

export const getServerSideProps = withPageAuthRequired({
    // returnTo: '/unauthorized',
    getServerSideProps: superUserGetUserData,
});

export default function Home({
    menuSections,
    allUsers,
}: {
    menuSections: MenuSection[];
    allUsers: User[];
}) {
    return (
        <LeftMenuWrappedContent
            productKey="miller-start"
            menuHeaderTitle="Super Admin"
            menuHeaderHref="/super-admin"
            menuSections={menuSections}
        >
            <UsersSuperAdmin allUsers={allUsers} title={"Users"} />
        </LeftMenuWrappedContent>
    );
}
