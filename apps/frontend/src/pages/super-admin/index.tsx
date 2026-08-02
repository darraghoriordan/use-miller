import type { GetServerSideProps } from "next";
import { LeftMenuWrappedContent } from "../../components/LeftMenuWrappedContent";
import type { MenuSection } from "../../components/LeftMenu";
import { withSuperAdminPageRequired } from "../../lib/server-auth";
import { AdminOverview } from "../../super-admin/components/AdminOverview";
import { createMenu } from "../../super-admin/services/superAdminData";

export const getServerSideProps = withSuperAdminPageRequired(async () => ({
    props: { menuSections: createMenu() },
})) satisfies GetServerSideProps<{ menuSections: MenuSection[] }>;

export default function SuperAdminHome({
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
            <AdminOverview />
        </LeftMenuWrappedContent>
    );
}
