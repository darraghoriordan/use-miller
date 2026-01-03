import { MenuSection } from "../../components/LeftMenu";
import type { components } from "../../shared/types/api-specs";
import { LeftMenuWrappedContent } from "../../components/LeftMenuWrappedContent";
import { getSubscriptionsServerSideProps } from "../../super-admin/services/superAdminData";
import OrgSubsSuperAdmin from "../../super-admin/components/OrgSubsSuperAdmin";

type OrganisationSubscriptionRecord =
    components["schemas"]["OrganisationSubscriptionRecord"];

export const getServerSideProps = getSubscriptionsServerSideProps;

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
