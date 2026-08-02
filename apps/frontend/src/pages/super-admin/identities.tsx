import type { GetServerSideProps } from "next";
import type { MenuSection } from "../../components/LeftMenu";
import { LeftMenuWrappedContent } from "../../components/LeftMenuWrappedContent";
import { withSuperAdminPageRequired } from "../../lib/server-auth";
import { IdentityUsersAdmin } from "../../super-admin/components/IdentityUsersAdmin";
import { createMenu } from "../../super-admin/services/superAdminData";

export const getServerSideProps = withSuperAdminPageRequired(async () => ({
    props: { menuSections: createMenu() },
})) satisfies GetServerSideProps<{ menuSections: MenuSection[] }>;

export default function IdentityUsersPage({
    menuSections,
}: {
    menuSections: MenuSection[];
}) {
    return (
        <LeftMenuWrappedContent
            productKey="miller-start"
            menuHeaderTitle="Super Admin"
            menuHeaderHref="/super-admin"
            headerTitle="Miller Dev Tools"
            menuSections={menuSections}
            noIndex
        >
            <IdentityUsersAdmin />
        </LeftMenuWrappedContent>
    );
}
