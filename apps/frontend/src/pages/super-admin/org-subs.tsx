import { MenuSection } from "../../components/LeftMenu.jsx";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { OrganisationSubscriptionRecord } from "@use-miller/shared-api-client";
import { LeftMenuWrappedContent } from "../../components/LeftMenuWrappedContent.jsx";
import { superUserGetSubscriptionsData } from "../../super-admin/services/superAdminData.js";
import OrgSubsSuperAdmin from "../../super-admin/components/OrgSubsSuperAdmin.jsx";

export const getServerSideProps = withPageAuthRequired({
    // returnTo: '/unauthorized',
    getServerSideProps: superUserGetSubscriptionsData,
});

export default function Home({
    menuSections,
    allSubs,
}: {
    menuSections: MenuSection[];
    allSubs: OrganisationSubscriptionRecord[];
}) {
    return (
        <LeftMenuWrappedContent
            menuHeaderTitle="Super Admin"
            menuHeaderHref="/super-admin"
            menuSections={menuSections}
        >
            <OrgSubsSuperAdmin allSubs={allSubs} title={"Org Subscriptions"} />
        </LeftMenuWrappedContent>
    );
}
