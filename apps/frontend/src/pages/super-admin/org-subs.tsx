import { MenuSection } from "../../components/LeftMenu";
import type { components } from "../../shared/types/api-specs";
import { LeftMenuWrappedContent } from "../../components/LeftMenuWrappedContent";
import { superUserGetSubscriptionsData } from "../../super-admin/services/superAdminData";
import OrgSubsSuperAdmin from "../../super-admin/components/OrgSubsSuperAdmin";
import { auth0 } from "../../lib/auth0";

type OrganisationSubscriptionRecord =
    components["schemas"]["OrganisationSubscriptionRecord"];

export const getServerSideProps = auth0.withPageAuthRequired({
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
            productKey="miller-start"
            menuHeaderTitle="Super Admin"
            menuHeaderHref="/super-admin"
            headerTitle="Miller Dev Tools"
            menuSections={menuSections}
        >
            <OrgSubsSuperAdmin allSubs={allSubs} title={"Org Subscriptions"} />
        </LeftMenuWrappedContent>
    );
}
