import { MenuSection } from "../../components/LeftMenu.jsx";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { dashboardGetSspData } from "../../dashboard/dashboardDataService.js";
import type { components } from "../../shared/types/api-specs";
import { DashboardDetails } from "../../dashboard/components/DashboardDetails.jsx";
import { LeftMenuWrappedContent } from "../../components/LeftMenuWrappedContent.jsx";

type Organisation = components["schemas"]["Organisation"];
type OrganisationSubscriptionRecord =
    components["schemas"]["OrganisationSubscriptionRecord"];
type SubscriptionAsset = components["schemas"]["SubscriptionAsset"];
type UserDto = components["schemas"]["UserDto"];

export const getServerSideProps = withPageAuthRequired({
    // returnTo: '/unauthorized',
    getServerSideProps: dashboardGetSspData,
});

export default function Home({
    menuSections,
    currentOrg,
    currentUser,
    subAssets,
    subs,
    ghUsername,
}: {
    menuSections: MenuSection[];
    currentOrg: Organisation;
    currentUser: UserDto;
    subAssets: SubscriptionAsset[];
    subs: OrganisationSubscriptionRecord[];
    ghUsername: string | undefined;
}) {
    return (
        <LeftMenuWrappedContent
            menuHeaderTitle="Dashboard"
            menuHeaderHref="/dashboard"
            menuSections={menuSections}
            headerTitle={"Miller Dev Tools"}
        >
            <DashboardDetails
                subs={subs}
                subAssets={subAssets}
                currentOrg={currentOrg}
                currentUser={currentUser}
                ghUsername={ghUsername}
            />
        </LeftMenuWrappedContent>
    );
}
