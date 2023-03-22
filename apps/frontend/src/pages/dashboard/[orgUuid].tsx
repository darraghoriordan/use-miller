import { MenuSection } from "../../components/LeftMenu.jsx";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { dashboardGetSspData } from "../../dashboard/dashboardDataService.js";
import {
    Organisation,
    OrganisationSubscriptionRecord,
    UserDto,
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
    currentUser,
    subs,
}: {
    menuSections: MenuSection[];
    currentOrg: Organisation;
    currentUser: UserDto;
    subs: OrganisationSubscriptionRecord[];
}) {
    return (
        <LeftMenuWrappedContent
            productKey="miller-start"
            menuHeaderTitle="Dashboard"
            menuHeaderHref="/dashboard"
            menuSections={menuSections}
        >
            <DashboardDetails
                subs={subs}
                title={currentOrg.name}
                currentUser={currentUser}
            />
        </LeftMenuWrappedContent>
    );
}
