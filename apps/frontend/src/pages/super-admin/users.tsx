import { MenuSection } from "../../components/LeftMenu";
import type { components } from "../../shared/types/api-specs";
import { LeftMenuWrappedContent } from "../../components/LeftMenuWrappedContent";
import UsersSuperAdmin from "../../super-admin/components/UsersSuperAdmin";
import { getUsersServerSideProps } from "../../super-admin/services/superAdminData";

type User = components["schemas"]["User"];

export const getServerSideProps = getUsersServerSideProps;

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
            headerTitle="Miller Dev Tools"
            menuSections={menuSections}
        >
            <UsersSuperAdmin allUsers={allUsers} title={"Users"} />
        </LeftMenuWrappedContent>
    );
}
