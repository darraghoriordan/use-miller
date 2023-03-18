import { MenuSection } from "../../components/LeftMenu.jsx";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { dashboardGetSspData } from "../../dashboard/dashboardDataService.js";
import {
    Organisation,
    OrganisationSubscriptionRecord,
} from "@use-miller/shared-api-client";
import { DashboardDetails } from "../../dashboard/components/DashboardDetails.jsx";
import { LeftMenuWrappedContent } from "../../components/LeftMenuWrappedContent.jsx";

export const getServerSideProps = withPageAuthRequired({
    // returnTo: '/unauthorized',
    getServerSideProps: dashboardGetSspData,
});

export default function Home({
    menuSections,
    currentOrg,
    subs,
}: {
    menuSections: MenuSection[];
    currentOrg: Organisation;
    subs: OrganisationSubscriptionRecord[];
}) {
    return (
        <LeftMenuWrappedContent
            menuHeaderTitle="Dashboard"
            menuHeaderHref="/dashboard"
            menuSections={menuSections}
        >
            <DashboardDetails subs={subs} title={currentOrg.name} />
        </LeftMenuWrappedContent>
    );
}
